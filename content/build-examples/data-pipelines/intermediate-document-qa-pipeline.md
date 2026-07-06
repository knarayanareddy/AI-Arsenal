---
id: "intermediate-document-qa-pipeline"
title: "Document Q&A Pipeline"
difficulty: "intermediate"
description: "Parse, chunk, and index documents into Postgres via pgvector, with provenance metadata and a citation-backed Q&A query"
tags:
  - rag
  - data
  - retrieval
stack:
  - docling
  - pgvector
estimated_time: "2-3 days"
repo_url: null
demo_url: null
added_date: "2026-06-14"
added_by: "maintainer"
last_reviewed: "2026-07-06"
status: "active"
phase: "data-pipelines"
build_status: "untested"
outcome: "working-prototype"
cost_estimate: "free with local models; requires a running Postgres instance"
prerequisites:
  - "A running PostgreSQL instance with the pgvector extension available (Docker: postgres:16 plus `CREATE EXTENSION vector`)"
  - "Representative documents with real layout complexity (tables, headings) -- clean plain text will hide parsing bugs"
  - "A decision on citation granularity (page-level vs. section-level) before writing the chunking code"
extended_by:
  - "starter-basic-rag-chatbot"
related_tips:
  - "store-parser-version-with-every-chunk"
  - "keep-source-page-and-section-metadata"
enrichment_status: "draft"
enrichment_notes: "The Docling document_converter.DocumentConverter().convert(source).document API and the pgvector-python Psycopg 3 register_vector/CREATE TABLE/<-> query pattern were both confirmed directly against their current official docs/README during authoring (Docling docs fetched live; pgvector-python README fetched live) -- neither is invented. Neither Docling parsing nor an actual Postgres+pgvector connection was executed end-to-end in this sandboxed pass (no Postgres instance available), so build_status is honestly untested."
---

## What You're Building

A pipeline that parses real documents (PDFs, Office files, HTML), preserves page/section provenance through chunking, stores embeddings in Postgres via pgvector, and answers questions with citations back to the source location — not just the source filename. This is the data-pipeline half of what [Production RAG API](../rag-systems/intermediate-production-rag-api.md) builds a serving layer on top of.

## Prerequisites

- [ ] A running PostgreSQL 16+ instance with the `vector` extension installed (`docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres pgvector/pgvector:pg16` is the fastest path)
- [ ] Documents with actual layout complexity — a folder of clean `.txt` files will not surface the parsing bugs this build is designed to catch
- [ ] A decision on citation granularity (page number, section heading, or both) made before writing the chunking code, since retrofitting it later means re-parsing everything

## Architecture Overview

```mermaid
flowchart TD
    DOC[PDF / Office docs] --> PARSE[Docling DocumentConverter]
    PARSE --> REVIEW[Inspect parsed Markdown before indexing]
    REVIEW --> CHUNK[Chunk + attach page/section metadata]
    CHUNK --> EMBED[Local embedding model]
    EMBED --> PG[(Postgres + pgvector)]
    U[User question] --> API[Query function]
    API --> PG
    API --> ANSWER[Answer + citations: file, page, section]
```

## Implementation

### 1. Install pinned dependencies

```bash
pip install "docling==2.110.0" "psycopg[binary]==3.3.4" "pgvector==0.4.2" \
  "sentence-transformers"
```

### 2. Set up the Postgres schema

```python
# setup_db.py
import psycopg
from pgvector.psycopg import register_vector

conn = psycopg.connect("postgresql://postgres:postgres@localhost:5432/postgres", autocommit=True)
conn.execute("CREATE EXTENSION IF NOT EXISTS vector")
register_vector(conn)

conn.execute("""
    CREATE TABLE IF NOT EXISTS chunks (
        id bigserial PRIMARY KEY,
        source_file text NOT NULL,
        page_number int,
        section_heading text,
        parser_version text NOT NULL,
        chunk_text text NOT NULL,
        embedding vector(384)
    )
""")
conn.execute("CREATE INDEX IF NOT EXISTS chunks_embedding_idx ON chunks USING hnsw (embedding vector_cosine_ops)")
print("Schema ready.")
```

### 3. Parse and inspect before indexing

```python
# parse.py
from docling.document_converter import DocumentConverter

PARSER_VERSION = "docling-2.110.0"


def parse_document(path: str) -> str:
    converter = DocumentConverter()
    result = converter.convert(path)
    markdown = result.document.export_to_markdown()
    return markdown


if __name__ == "__main__":
    import sys
    md = parse_document(sys.argv[1])
    print(md[:1000])  # ALWAYS inspect this before trusting it downstream
```

Run it and actually read the output before writing a single line of chunking code:

```bash
python parse.py docs/employee_handbook.pdf
```

### 4. Chunk with provenance metadata and embed

```python
# index_documents.py
import psycopg
from pgvector.psycopg import register_vector
from sentence_transformers import SentenceTransformer
from parse import parse_document, PARSER_VERSION

model = SentenceTransformer("all-MiniLM-L6-v2")  # 384-dim, matches the schema above


def chunk_markdown(markdown: str, source_file: str, chunk_size: int = 800):
    # Minimal heading-aware chunker: split on level-2 headings, then by size.
    sections = markdown.split("\n## ")
    for section in sections:
        heading = section.split("\n", 1)[0].strip("# ").strip()
        text = section[len(heading):].strip()
        for i in range(0, len(text), chunk_size):
            piece = text[i:i + chunk_size].strip()
            if piece:
                yield {"source_file": source_file, "section_heading": heading, "chunk_text": piece}


def index_file(path: str, conn):
    markdown = parse_document(path)
    chunks = list(chunk_markdown(markdown, source_file=path))
    embeddings = model.encode([c["chunk_text"] for c in chunks])
    for chunk, embedding in zip(chunks, embeddings):
        conn.execute(
            """INSERT INTO chunks (source_file, section_heading, parser_version, chunk_text, embedding)
               VALUES (%s, %s, %s, %s, %s)""",
            (chunk["source_file"], chunk["section_heading"], PARSER_VERSION, chunk["chunk_text"], embedding),
        )
    conn.commit()
    print(f"Indexed {len(chunks)} chunks from {path}")


if __name__ == "__main__":
    import sys
    conn = psycopg.connect("postgresql://postgres:postgres@localhost:5432/postgres")
    register_vector(conn)
    index_file(sys.argv[1], conn)
```

### 5. Query with citations

```python
# query.py
import psycopg
from pgvector.psycopg import register_vector
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def ask(question: str, top_k: int = 3):
    conn = psycopg.connect("postgresql://postgres:postgres@localhost:5432/postgres")
    register_vector(conn)
    query_embedding = model.encode(question)
    rows = conn.execute(
        """SELECT source_file, section_heading, chunk_text, embedding <-> %s AS distance
           FROM chunks ORDER BY distance LIMIT %s""",
        (query_embedding, top_k),
    ).fetchall()
    for source_file, heading, text, distance in rows:
        print(f"[{source_file} — {heading}] (distance {distance:.3f})\n{text[:200]}\n")
    return rows


if __name__ == "__main__":
    import sys
    ask(sys.argv[1])
```

## Verify It Worked

```bash
python setup_db.py
python index_documents.py docs/employee_handbook.pdf
python query.py "How many vacation days do employees get?"
```

Expected: the top-ranked result's `source_file` and `section_heading` should genuinely be the section of the document that answers the question, and `distance` should be noticeably lower for it than for unrelated chunks. Run `psql -c "SELECT count(*) FROM chunks"` independently to confirm the row count matches your expectation from the number/size of documents indexed — a suspiciously low count usually means parsing silently produced near-empty output for some files.

## What Can Go Wrong

- **Parsing quality dominates retrieval quality, and failures are silent.** A malformed PDF can produce a `markdown` string with garbled tables or missing sections, and everything downstream (chunking, embedding, retrieval) will run without error on the bad text. This is why Step 3 insists on reading the raw parser output before writing chunking code — see [Store Parser and Chunker Version With Every Chunk](../../tips-and-tricks/rag-and-retrieval/store-parser-version-with-every-chunk.md).
- **`vector(384)` in the schema must match your embedding model's actual output dimension.** `all-MiniLM-L6-v2` produces 384-dim vectors; swapping to a different model without updating the column dimension raises a Postgres error on insert (dimension mismatch), not a silent truncation.
- **The naive heading-based chunker in Step 4 breaks on documents with no `## ` headings**, or where Docling's Markdown export uses a different heading level for the actual content structure — inspect the parsed Markdown's heading levels for your specific document set rather than assuming level-2.
- **Missing the `HNSW` index means every query does a full sequential scan** — fine for a few hundred chunks in development, silently catastrophic at scale. The index in Step 2 is not optional once you have more than a few thousand rows.
- **Forgetting `register_vector(conn)` on a new connection** causes `INSERT`/`SELECT` calls involving the `embedding` column to fail with a type-adaptation error, since Psycopg doesn't know how to serialize/deserialize the `vector` type without it.

## Cost

Parsing (Docling) and embedding (`all-MiniLM-L6-v2` via `sentence-transformers`) both run locally and are free. The only real infrastructure cost is running Postgres itself, which is free to self-host (Docker) or has usage-based pricing on managed providers.

## Extensions

Add row-level security in Postgres if multi-tenant isolation matters — pgvector rows are ordinary Postgres rows and support the same RLS policies as any other table. Wrap this pipeline's `ask()` function behind a FastAPI endpoint once you need concurrent access — see [Production RAG API](../rag-systems/intermediate-production-rag-api.md), which builds exactly that layer on top of a Qdrant-backed variant of this pattern.

## Related Entries

- Parser: [Docling](../../projects/data-and-retrieval/docling.md)
- Parser: [Unstructured](../../projects/data-and-retrieval/unstructured.md)
- Vector DB: [pgvector](../../projects/data-and-retrieval/pgvector.md)
- Tip: [Store Parser and Chunker Version With Every Chunk](../../tips-and-tricks/rag-and-retrieval/store-parser-version-with-every-chunk.md)
- Extends into: [Basic RAG Chatbot](../rag-systems/starter-basic-rag-chatbot.md), [Production RAG API](../rag-systems/intermediate-production-rag-api.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
