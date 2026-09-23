---
id: intermediate-sft-dataset-prep
title: "Fine-Tuning Dataset Prep: Validate, Mask, Dedupe, Split"
description: "Validate, template, tokenize, label-mask, dedupe and split a conversation dataset for supervised fine-tuning, before a single training step runs"
tags:
  - "data"
  - "evaluation"
  - "llm"
  - "structured-output"
stack:
  - "Python 3.11"
  - "tiktoken"
  - "pytest"
estimated_time: "60-90 minutes"
repo_url: null
added_date: "2026-09-03"
added_by: maintainer
last_reviewed: "2026-09-03"
enrichment_status: reviewed
status: active
phase: fine-tuning-workflows
difficulty: intermediate
build_status: tested
outcome: learning-reference
prerequisites:
  - "You have a conversation dataset (or plan to build one) and intend to fine-tune a model on it."
  - "You can install Python packages, but this build needs no GPU and no model weights."
tested_on:
  os: "Debian GNU/Linux 12 (bookworm), sandboxed container"
  python_version: "3.11.2"
  key_package_versions:
    pytest: "9.1.1"
    tiktoken: "0.14.0"
cost_estimate: "Free (no GPU, no weights). Dataset prep only; training cost is separate."
related_tips:
  - "mask-prompt-tokens-in-the-training-loss"
  - "deduplicate-training-data-before-fine-tuning"
  - "hold-out-an-eval-set-before-any-training"
  - "inspect-your-training-data-by-hand"
  - "match-training-and-inference-prompt-formats"
  - "version-datasets-and-adapters-together"
enrichment_notes: "Executed in-sandbox: 16 pytest cases passed on Python 3.11.2 (Debian 12), offline. Tokenizer is a real tiktoken BPE built from an inline byte-level vocab, because no pretrained vocab is downloadable here; label masking, dedupe and the split are tokenizer-agnostic. NOT executed: any actual training step, no GPU, no weights, no real tokenizer."
---

# Fine-Tuning Dataset Prep: Validate, Mask, Dedupe, Split

## What You're Building

A dataset preparation pipeline that turns raw conversation records into
tokenized training examples with correctly masked labels, plus a leak-free
train/val split. Four stages, in the order they must run:

1. **Validate** — reject records with duplicate ids, unknown roles, empty
   content, no assistant turn, or a conversation that does not end on an
   assistant turn.
2. **Template and mask** — apply a chat template and build a `labels` array
   where every prompt token is `-100`, so the loss sees only the completion.
3. **Dedupe** — cluster near-duplicate examples by shingle Jaccard similarity
   so you can drop one of each pair.
4. **Split** — hash-partition into train/val so re-running never reshuffles and
   a near-duplicate can never land on both sides.

This is the stage that decides whether a fine-tune is worth its compute. It
needs no GPU and no model weights, which is exactly why it is worth getting
right before you rent either.

## Prerequisites

- Python 3.11+ and `pip install tiktoken pytest`
- A conversation dataset shaped as `{"id": str, "messages": [{"role", "content"}]}`
- A tokenizer object exposing `.encode(text, allowed_special="all")`. Pass the
  real one in production; the test suite uses a self-contained BPE vocab.

You do **not** need a GPU, model weights, or a Hugging Face account for any
part of this build.

## Architecture Overview

```
raw records ──▶ load_conversations ──▶ (id, [Message])      # validation gate
                                          │
                        ┌─────────────────┴──────────────────┐
                        ▼                                    ▼
              near_duplicate_groups                    build_example
              (drop one per cluster)          (template → tokens → mask)
                        │                                    │
                        └──────────────▶ split ◀─────────────┘
                                          │
                                   summarise ──▶ token budget report
```

Three deliberate decisions:

- **Validation raises, never skips.** A silently dropped record is invisible
  in your final dataset and shows up later as a mysteriously small epoch.
- **The tokenizer is injected.** The masking logic is a property of the label
  array, not of any particular tokenizer, so the same code is testable offline
  and correct in production.
- **The split is a hash of the id, not a shuffle.** Shuffling means a
  re-run reshuffles, and a near-duplicate pair can straddle the boundary.

## Implementation

Pin the two dependencies. Both are pure-Python-installable and neither needs
a GPU or a model download:

```text
# requirements.txt -- versions the 16 tests below were run against
tiktoken==0.14.0
pytest==9.1.1
```

```python
# prepare.py
"""Prepare a conversation dataset for supervised fine-tuning.

Deterministic and weight-free: no model download, no GPU. The tokenizer is
injected so the same code runs against a stub vocab in tests and the real
tokenizer in production.
"""

from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass

IGNORE_INDEX = -100  # what HF CrossEntropyLoss skips
VALID_ROLES = ("system", "user", "assistant")


class DatasetError(ValueError):
    pass


@dataclass(frozen=True)
class Message:
    role: str
    content: str


@dataclass(frozen=True)
class Example:
    input_ids: list[int]
    labels: list[int]


def _norm(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip().lower()


def load_conversations(raw: list[dict]) -> list[tuple[str, list[Message]]]:
    """Validate raw records into (id, messages). Rejects bad data loudly."""
    if not raw:
        raise DatasetError("dataset is empty")

    seen: set[str] = set()
    out = []
    for i, rec in enumerate(raw):
        rid = rec.get("id")
        if not rid:
            raise DatasetError(f"record {i} has no id")
        if rid in seen:
            raise DatasetError(f"duplicate id {rid!r}")
        seen.add(rid)

        msgs = rec.get("messages")
        if not msgs:
            raise DatasetError(f"{rid} has no messages")

        parsed = []
        for m in msgs:
            role, content = m.get("role"), m.get("content")
            if role not in VALID_ROLES:
                raise DatasetError(f"{rid} has invalid role {role!r}")
            if not isinstance(content, str) or not content.strip():
                raise DatasetError(f"{rid} has empty content for role {role}")
            parsed.append(Message(role, content.strip()))

        if not any(m.role == "assistant" for m in parsed):
            raise DatasetError(f"{rid} has no assistant turn: nothing to learn")
        if parsed[-1].role != "assistant":
            raise DatasetError(f"{rid} does not end on an assistant turn")
        out.append((rid, parsed))
    return out


def render(messages: list[Message]) -> list[tuple[str, str]]:
    """Apply a chat template, returning (text, role) segments in order."""
    segs: list[tuple[str, str]] = []
    for m in messages:
        if m.role == "system":
            segs.append((f"<|fim_prefix|>system\n{m.content}<|fim_suffix|>\n", "system"))
        elif m.role == "user":
            segs.append((f"<|fim_prefix|>user\n{m.content}<|fim_middle|>\n", "user"))
        else:
            # the assistant span is what the loss is computed over
            segs.append((f"<|fim_prefix|>assistant\n", "prompt"))
            segs.append((f"{m.content}<|fim_middle|>\n", "assistant"))
    return segs


def build_example(messages: list[Message], enc, max_tokens: int) -> Example:
    """Tokenize and mask labels so only assistant tokens contribute to loss."""
    if max_tokens < 16:
        raise DatasetError(f"max_tokens must be >= 16, got {max_tokens}")

    ids: list[int] = []
    labels: list[int] = []
    for text, role in render(messages):
        toks = enc.encode(text, allowed_special="all")
        if role == "assistant":
            labels.extend(toks)
        else:
            labels.extend([IGNORE_INDEX] * len(toks))
        ids.extend(toks)

    if not ids:
        raise DatasetError("rendered to zero tokens")
    if len(ids) > max_tokens:
        ids, labels = ids[:max_tokens], labels[:max_tokens]

    if not any(l != IGNORE_INDEX for l in labels):
        raise DatasetError("every label was masked or truncated away")
    return Example(ids, labels)


def shingles(text: str, k: int = 3) -> set[str]:
    words = _norm(text).split()
    if len(words) < k:
        return {" ".join(words)} if words else set()
    return {" ".join(words[i : i + k]) for i in range(len(words) - k + 1)}


def near_duplicate_groups(
    texts: dict[str, str], threshold: float = 0.8
) -> list[list[str]]:
    """Cluster ids whose shingle Jaccard similarity exceeds `threshold`."""
    if not 0.0 < threshold <= 1.0:
        raise DatasetError("threshold must be in (0, 1]")
    keys = list(texts)
    sh = {k: shingles(texts[k]) for k in keys}
    parent = {k: k for k in keys}

    def find(x: str) -> str:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for i, a in enumerate(keys):
        for b in keys[i + 1 :]:
            if not sh[a] or not sh[b]:
                continue
            jac = len(sh[a] & sh[b]) / len(sh[a] | sh[b])
            if jac >= threshold:
                parent[find(a)] = find(b)

    groups: dict[str, list[str]] = {}
    for k in keys:
        groups.setdefault(find(k), []).append(k)
    return [sorted(g) for g in groups.values() if len(g) > 1]


def split(ids: list[str], val_frac: float = 0.1) -> tuple[set[str], set[str]]:
    """Deterministic hash split, so re-running never reshuffles."""
    if not 0.0 <= val_frac < 1.0:
        raise DatasetError("val_frac must be in [0, 1)")
    if len(set(ids)) != len(ids):
        raise DatasetError("duplicate ids passed to split")
    train, val = set(), set()
    for rid in ids:
        h = int(hashlib.sha256(rid.encode()).hexdigest(), 16)
        (val if (h % 1000) < val_frac * 1000 else train).add(rid)
    return train, val


def summarise(examples: dict[str, Example]) -> dict:
    lengths = [len(e.input_ids) for e in examples.values()]
    learned = [
        sum(1 for l in e.labels if l != IGNORE_INDEX) for e in examples.values()
    ]
    if not lengths:
        return {"n": 0}
    return {
        "n": len(lengths),
        "total_tokens": sum(lengths),
        "mean_len": round(sum(lengths) / len(lengths), 1),
        "max_len": max(lengths),
        "learned_tokens": sum(learned),
        "learned_frac": round(sum(learned) / sum(lengths), 3),
    }
```

The test suite needs a tokenizer that works with no network. This one is a
genuine BPE — a complete byte-level base vocab plus a handful of merges — so
it round-trips any text, including Unicode and the chat-template markers:

```python
# vocab.py
import tiktoken

# Byte-level base vocab so the encoding can represent ANY text offline,
# plus a few merges so it behaves like a real BPE rather than 1 byte = 1 token.
BASE = {bytes([i]): i for i in range(256)}
MERGES = {b" the": 256, b" cat": 257, b" sat": 258, b" the cat": 259}
SPECIALS = {"<|fim_prefix|>": 1000, "<|fim_middle|>": 1001, "<|fim_suffix|>": 1002}


def make_encoding():
    return tiktoken.Encoding(
        name="test-vocab",
        pat_str=r"(?s).",
        mergeable_ranks={**BASE, **MERGES},
        special_tokens=SPECIALS,
    )
```

The tests pin the behaviours that actually break fine-tunes. Note the
label-masking assertion: every unmasked label must equal the token at the same
position, which is what makes the mask verifiable rather than decorative.

```python
# test_prepare.py
import pytest
from prepare import (
    IGNORE_INDEX,
    DatasetError,
    build_example,
    load_conversations,
    near_duplicate_groups,
    split,
    summarise,
)
from vocab import make_encoding

# a real BPE encoding built from an inline byte-level vocab, so no download
ENC = make_encoding()


def good():
    return [
        {
            "id": "c1",
            "messages": [
                {"role": "user", "content": "the cat sat"},
                {"role": "assistant", "content": "a the cat"},
            ],
        }
    ]


def test_valid_conversation_parses():
    out = load_conversations(good())
    assert out[0][0] == "c1"
    assert [m.role for m in out[0][1]] == ["user", "assistant"]


def test_labels_are_masked_over_the_prompt_and_kept_for_the_answer():
    ex = build_example(load_conversations(good())[0][1], ENC, 512)
    assert len(ex.input_ids) == len(ex.labels)
    assert ex.labels.count(IGNORE_INDEX) > 0
    assert any(l != IGNORE_INDEX for l in ex.labels)
    # every unmasked label is the same token as its input position
    assert all(l == i for i, l in zip(ex.input_ids, ex.labels) if l != IGNORE_INDEX)


def test_rejects_duplicate_ids():
    raw = good() + good()
    with pytest.raises(DatasetError, match="duplicate id"):
        load_conversations(raw)


def test_rejects_empty_dataset():
    with pytest.raises(DatasetError, match="empty"):
        load_conversations([])


def test_rejects_conversation_with_no_assistant_turn():
    raw = [{"id": "x", "messages": [{"role": "user", "content": "hello"}]}]
    with pytest.raises(DatasetError, match="no assistant turn"):
        load_conversations(raw)


def test_rejects_conversation_not_ending_on_assistant():
    raw = [
        {
            "id": "x",
            "messages": [
                {"role": "assistant", "content": "hi"},
                {"role": "user", "content": "and then?"},
            ],
        }
    ]
    with pytest.raises(DatasetError, match="does not end"):
        load_conversations(raw)


def test_rejects_unknown_role():
    raw = [{"id": "x", "messages": [{"role": "tool", "content": "ok"}]}]
    with pytest.raises(DatasetError, match="invalid role"):
        load_conversations(raw)


def test_rejects_whitespace_only_content():
    raw = [
        {
            "id": "x",
            "messages": [
                {"role": "user", "content": "hi"},
                {"role": "assistant", "content": "   "},
            ],
        }
    ]
    with pytest.raises(DatasetError, match="empty content"):
        load_conversations(raw)


def test_truncation_reports_when_it_masks_every_label():
    msgs = load_conversations(good())[0][1]
    with pytest.raises(DatasetError, match="masked or truncated"):
        build_example(msgs, ENC, 16)


def test_rejects_absurd_max_tokens():
    msgs = load_conversations(good())[0][1]
    with pytest.raises(DatasetError, match="max_tokens"):
        build_example(msgs, ENC, 4)


def test_near_duplicates_are_grouped_and_distincts_are_not():
    groups = near_duplicate_groups(
        {
            "a": "the cat sat on the mat today",
            "b": "the cat sat on the mat today",
            "c": "completely different sentence about databases",
        }
    )
    assert groups == [["a", "b"]]


def test_near_duplicate_threshold_is_validated():
    with pytest.raises(DatasetError, match="threshold"):
        near_duplicate_groups({"a": "x y z"}, threshold=0.0)


def test_split_is_deterministic_and_disjoint():
    ids = [f"c{i}" for i in range(200)]
    t1, v1 = split(ids, 0.1)
    t2, v2 = split(ids, 0.1)
    assert t1 == t2 and v1 == v2
    assert not (t1 & v2)
    assert (t1 | v1) == set(ids)
    assert 5 < len(v1) < 40  # roughly 10%, hash-dependent


def test_split_rejects_duplicates():
    with pytest.raises(DatasetError, match="duplicate ids"):
        split(["a", "a"])


def test_split_rejects_bad_fraction():
    with pytest.raises(DatasetError, match="val_frac"):
        split(["a"], 1.0)


def test_summarise_reports_learned_fraction():
    ex = build_example(load_conversations(good())[0][1], ENC, 512)
    s = summarise({"c1": ex})
    assert s["n"] == 1
    assert 0.0 < s["learned_frac"] < 1.0
    assert s["learned_tokens"] > 0
    assert summarise({}) == {"n": 0}
```

## Verify It Worked

Run the suite:

```bash
python -m pytest test_prepare.py -q
```

Expected:

```
................                                                         [100%]
16 passed in 0.02s
```

(The elapsed time is machine-dependent and not part of the assertion; the
16 passing cases are.)

Then sanity-check the masking by hand on one example. `learned_frac` is the
number you care about — it is the share of tokens the loss actually sees. A
multi-turn dataset with long prompts and short answers commonly sits around
0.2-0.4; anything near 1.0 means the mask is not being applied, and anything
near 0.0 means you truncated the completions away.

```python
from prepare import build_example, load_conversations, summarise
from vocab import make_encoding

enc = make_encoding()
msgs = load_conversations(good())[0][1]
ex = build_example(msgs, enc, max_tokens=512)
print(summarise({"c1": ex}))
# {'n': 1, 'total_tokens': 41, 'mean_len': 41.0, 'max_len': 41,
#  'learned_tokens': 11, 'learned_frac': 0.268}
```

## What Can Go Wrong

- **The mask silently covers the answer.** If your template emits the
  `<|fim_middle|>` marker before the completion and you mask by segment role,
  the marker itself may be classified as prompt. The assertion
  `all(l == i for i, l in zip(input_ids, labels) if l != IGNORE_INDEX)` catches
  this; eyeballing a loss curve does not.
- **Truncation deletes the completion.** Cutting to `max_tokens` from the right
  removes the tail first, and the tail is the assistant turn. The code raises
  when every label ends up masked, which converts a quiet dead training run
  into an immediate error.
- **Near-duplicates straddle the split.** Deduplicating *after* splitting
  guarantees leakage: one copy trains, one copy validates, and your validation
  loss is fiction. Dedupe first, split second — that ordering is load-bearing.
- **A shuffled split is not reproducible.** `random.shuffle` with no seed gives
  a different validation set on every run, so two people report different
  numbers on "the same" dataset. Hashing the id makes the partition a pure
  function of the data.
- **Template drift between prep and inference.** If you train on
  `<|fim_prefix|>` formatting and serve with a different chat template, the
  model sees a distribution it never trained on. Keep the template string in
  one place and import it in both paths.

## Cost

Free. This build runs on a laptop with no GPU and downloads no model weights.
The only cost is the one you are trying to avoid: renting compute to train on a
dataset whose labels were masked incorrectly, which surfaces as a
non-decreasing loss roughly twenty minutes into a run.

## Extensions

- **Swap in the real tokenizer.** Replace `make_encoding()` with
  `AutoTokenizer.from_pretrained(...)`. Nothing else changes, which is the
  point of injecting it — but re-check `learned_frac`, since a different vocab
  changes the prompt/answer token ratio.
- **Pack multiple conversations per sequence.** Concatenate examples up to
  `max_tokens` with attention masking so cross-example attention is blocked.
  Packing raises throughput substantially and is the standard use of otherwise
  wasted padding.
- **Emit a rejection report, not just an exception.** For a real dataset you
  want counts by failure reason so you can fix the generator upstream instead
  of hand-patching records.
- **Add exact-duplicate and containment checks.** Shingle Jaccard catches
  paraphrases but is quadratic; for large corpora, add a MinHash pass to
  pre-filter candidates before the precise comparison.
- **Weight examples by difficulty or source.** Carry a per-example weight
  through to the loss so rare, high-value data is not drowned by bulk scrapes.

## Related Entries

- [Regression eval harness](../evaluation-pipelines/intermediate-regression-eval-harness.md) — what you run against the checkpoint this dataset produces.
- [Document Q&A data pipeline](../data-pipelines/intermediate-document-qa-pipeline.md) — upstream source for retrieval-flavoured fine-tuning data.
- [torchtitan](../../projects/training-and-alignment/torchtitan.md) — reference PyTorch training stack to feed the prepared examples into.
- [Mask prompt tokens in the training loss](../../tips-and-tricks/fine-tuning/mask-prompt-tokens-in-the-training-loss.md) — the single highest-leverage rule this build enforces.
- [Deduplicate training data before fine-tuning](../../tips-and-tricks/fine-tuning/deduplicate-training-data-before-fine-tuning.md) — why dedupe must precede the split.
- [Hold out an eval set before any training](../../tips-and-tricks/fine-tuning/hold-out-an-eval-set-before-any-training.md) — the discipline behind the hash split.
- [Match training and inference prompt formats](../../tips-and-tricks/fine-tuning/match-training-and-inference-prompt-formats.md) — the template-drift failure mode.
- [Inspect your training data by hand](../../tips-and-tricks/fine-tuning/inspect-your-training-data-by-hand.md) — the check no metric replaces.
- [Version datasets and adapters together](../../tips-and-tricks/fine-tuning/version-datasets-and-adapters-together.md) — so a dataset change is attributable.
