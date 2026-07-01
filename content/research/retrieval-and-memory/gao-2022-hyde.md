---
id: gao-2022-hyde
title: "Precise Zero-Shot Dense Retrieval without Relevance Labels"
phase: retrieval-and-memory
venue: acl
year: 2022
authors:
  - "Gao, L."
  - "Ma, X."
  - "Lin, J."
  - "Callan, J."
arxiv_id: "2212.10496"
arxiv_url: "https://arxiv.org/abs/2212.10496"
pdf_url: "https://arxiv.org/pdf/2212.10496"
code_url: "https://github.com/texttron/hyde"
venue_url: "https://aclanthology.org/2023.acl-long.99/"

practical_applicability: medium
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 800

tldr: "Showed you can retrieve well in a zero-shot setting by generating a hypothetical answer first and embedding that instead of the raw query, meaning you should reach for HyDE specifically when you have no labeled relevance data to train or fine-tune a retriever"
key_contribution: "Showed that generating a 'fake' hypothetical document from the query with an instruction-following LLM, then embedding that hypothetical document (not the raw query) for similarity search, significantly outperforms unsupervised dense retrieval baselines with zero relevance-labeled training data"

builds_on:
  - lewis-2020-rag
implemented_in: []

tags:
  - rag
  - retrieval
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that zero-shot dense retrieval — retrieval with no relevance-labeled training data at all — can be made significantly more accurate by first generating a hypothetical answer document with an instruction-following LLM, then embedding that generated document (not the original query) for similarity search against the real corpus. This remains a current, valid technique specifically for the zero-shot case; it has not been superseded, but it has also not become the default retrieval approach for most production RAG systems, since most teams that can obtain even modest labeled or synthetic relevance data (or simply use a strong general-purpose embedding model) get comparable or better results with much simpler standard dense retrieval.

## Why it's in the Arsenal

- HyDE directly addresses a specific, recurring problem: what do you do when you need to build a retrieval system but have no relevance-labeled data to train or fine-tune a retriever, and no time to collect any — this is a real, narrow-but-recurring scenario (a new domain, a cold-start project, a low-resource language) where this paper's technique is the concrete answer.
- `practical_applicability: medium` is an honest, non-inflated classification: this is not the default retrieval technique most production RAG systems use (see Limitations), but it is directly and immediately useful in the specific zero-shot scenario it targets, which is common enough to be worth knowing rather than a purely theoretical curiosity.

## Core Contribution

Prior zero-shot dense retrieval approaches struggled because encoding a short query and a long document into the same embedding space for direct comparison is a difficult, information-asymmetric matching problem when no labeled query-document relevance pairs exist to train the encoders to bridge that gap. This paper's insight is to sidestep query-document matching entirely: instead of embedding the query directly, prompt an instruction-following LLM (like InstructGPT) to generate a "hypothetical" document that would plausibly answer the query — a document that may contain factual errors or hallucinations, but that captures the relevance patterns and semantic content a real answering document would have — then embed that hypothetical document using an unsupervised contrastive encoder (like Contriever) and retrieve real documents similar to it. In engineering terms: this converts a hard query-to-document matching problem into an easier document-to-document similarity problem, using the LLM's generation capability to bridge the gap, and the retrieval step's dense embedding bottleneck naturally filters out most of the hallucinated details in the hypothetical document since only its broad semantic/topical content, not its specific (possibly wrong) facts, drives which real documents get retrieved.

## Key Results

- HyDE significantly outperformed the state-of-the-art unsupervised dense retriever Contriever across the paper's evaluated tasks (web search, question answering, fact verification) with zero relevance-labeled training data (2022) — the paper's central claim
- Showed strong performance comparable to fine-tuned (supervised) retrievers on several tasks despite using no labeled training data at all (2022) — a notable result given supervised fine-tuning typically requires substantial labeled data to reach comparable performance
- Demonstrated effectiveness across multiple non-English languages (Swahili, Korean, Japanese, Bengali) in the paper's own multilingual evaluation (2022) — relevant if your retrieval problem spans low-resource languages where labeled relevance data is especially scarce
- These are 2022-era comparisons against the specific unsupervised baselines (Contriever) and supervised baselines available at the time; current retrieval benchmarking would compare HyDE against more recent embedding models, which the original paper's own numbers do not reflect

## Methodology

Given a query, an instruction-following LLM (the paper uses InstructGPT) is zero-shot prompted to generate a hypothetical document that would plausibly answer or address the query — no examples or fine-tuning are needed for this generation step, only an appropriately worded instruction (paper Section 3). This hypothetical document, despite potentially containing factual errors, is then encoded using an unsupervised, contrastively-trained dense encoder (Contriever) into an embedding vector. That embedding vector is used to perform standard dense vector similarity search against the real corpus's document embeddings, retrieving real documents near the hypothetical document in embedding space. The paper frames the dense encoder's role as a "lossy compressor" that filters out the hypothetical document's specific hallucinated details while preserving its broader relevance-indicating semantic content — this filtering effect is what makes retrieval work despite the hypothetical document being potentially factually wrong.

## Practical Applicability

If you are building a retrieval system for a new domain, a low-resource language, or any scenario where you have no relevance-labeled query-document pairs and no time or budget to collect them, this paper's technique is a directly applicable, validated answer: generate a hypothetical document with an LLM, embed it, and retrieve based on that embedding instead of the raw query. If you already have access to relevance-labeled data (even a modest amount) or can use a strong, general-purpose pretrained embedding model that already performs well without this extra generation step, standard dense retrieval is simpler to operate (no extra LLM call per query) and often performs comparably or better — HyDE's value is specifically in the zero-shot, no-labeled-data scenario, not as a universal retrieval upgrade.

## Limitations & Critiques

The paper's own technique requires an additional LLM generation call per query before retrieval can happen, adding latency and cost compared to directly embedding the query — a tradeoff the original paper's framing (focused on retrieval quality) does not emphasize, but which is a real operational consideration for production systems where query latency matters. The technique's effectiveness depends on the instruction-following LLM's ability to generate a plausible, relevantly-detailed hypothetical document; for highly specialized or technical domains where the generating LLM itself lacks sufficient domain knowledge, the hypothetical document may be too generic or wrong in ways that don't get adequately filtered by the encoder's "lossy compressor" effect, a scenario the original paper's evaluation domains (web search, QA, fact verification) do not stress-test. As dense retrieval and embedding models have generally improved since 2022, some practitioners report that the gap between plain query embedding and HyDE has narrowed for many use cases, since modern general-purpose embedding models handle query-document asymmetry better than the 2022-era Contriever baseline did — this is a reasonable inference from general embedding-model progress rather than a documented head-to-head failed replication. No independent, credible failed-replication challenge to the paper's core empirical claims has been identified as of `last_reviewed: 2026-07-01`.

## Reproductions & Follow-up Work

HyDE's authors released official code, and the technique has been reproduced and integrated into mainstream RAG tooling, including a dedicated HyDE retriever implementation in LangChain — a direct, practical validation that the technique is usable as a drop-in retrieval strategy rather than remaining an academic-only result. Independent commentary and workshops discussing the technique (e.g. Arize's public discussion of HyDE) note that its practical benefit is corpus- and use-case-dependent, echoing the paper's own framing that this is a zero-shot-specific tool rather than a universal upgrade, consistent with the honest `practical_applicability: medium` classification here.

## Relation to the Arsenal

This paper builds on `lewis-2020-rag` (foundational/), operating within the same retrieve-then-generate framing that paper established, specifically addressing the zero-shot retrieval sub-problem RAG's original architecture did not need to solve at its own evaluation scale. It is grouped alongside `sarthi-2024-raptor` and `edge-2024-graphrag` in this phase folder as three distinct approaches to different retrieval-shape problems (zero-shot retrieval without labels, hierarchical multi-level summarization, and global/holistic graph-based summarization respectively) — read together to see the range of specific problems "retrieval" can mean depending on your use case, rather than treating RAG as one undifferentiated technique.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2212.10496)
- [arXiv](https://arxiv.org/abs/2212.10496)
- [Official Code](https://github.com/texttron/hyde)
- [Venue Proceedings](https://aclanthology.org/2023.acl-long.99/)
- [Papers With Code](https://paperswithcode.com/paper/precise-zero-shot-dense-retrieval-without)
- [Key Reproduction / Analysis](https://arize.com/blog/hyde-precise-zero-shot-dense-retrieval/) — independent practitioner workshop discussion of HyDE's practical tradeoffs, including its LangChain integration and open questions about corpus-dependent effectiveness
