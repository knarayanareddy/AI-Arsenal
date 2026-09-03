---
id: intermediate-image-preprocessing-pipeline
title: "Multimodal Image Preprocessing: Orientation, Buckets, Normalisation"
description: "Decode, de-rotate, flatten, aspect-bucket, pad and normalise images for a vision-language ingestion pipeline, deterministically and offline"
tags:
  - "data"
  - "inference"
  - "llm"
  - "structured-output"
stack:
  - "Python 3.11"
  - "Pillow"
  - "numpy"
  - "pytest"
estimated_time: "60-90 minutes"
repo_url: null
added_date: "2026-09-03"
added_by: maintainer
last_reviewed: "2026-09-03"
enrichment_status: reviewed
status: active
phase: multimodal
difficulty: intermediate
build_status: tested
outcome: learning-reference
prerequisites:
  - "You are feeding images into a vision-language model and control the preprocessing step yourself."
  - "You can install Python packages. This build needs no GPU and no model weights."
tested_on:
  os: "Debian GNU/Linux 12 (bookworm), sandboxed container"
  python_version: "3.11.2"
  key_package_versions:
    pytest: "9.1.1"
    pillow: "12.3.0"
    numpy: "2.4.6"
cost_estimate: "Free (CPU only, no weights). Preprocessing only; VLM inference is separate."
related_tips:
  - "pin-dependencies-for-inference-images"
  - "match-training-and-inference-prompt-formats"
enrichment_notes: "Executed in-sandbox: 18 pytest cases passed on Python 3.11.2 (Debian 12), offline, on synthetic images. Pillow 12.3.0, numpy 2.4.6. EXIF rotation, alpha compositing, aspect bucketing, padding and per-channel normalisation are all verified. NOT executed: any VLM forward pass -- no weights, no GPU, so tensor correctness is checked by shape and range only, not by model output."
---

# Multimodal Image Preprocessing: Orientation, Buckets, Normalisation

## What You're Building

The image half of a vision-language ingestion pipeline, as six pure functions
you can test without a model:

1. **Decode** — reject empty, corrupt, and absurdly large payloads instead of
   letting a half-decoded image reach the model.
2. **De-rotate** — apply the EXIF orientation tag once, then drop the tag so it
   cannot be applied a second time downstream.
3. **Flatten** — composite alpha onto white rather than discarding it, so a
   transparent-background screenshot is not silently black.
4. **Aspect-bucket** — pick the target resolution whose aspect ratio is closest
   in log space, so batching does not require one global size.
5. **Pad** — letterbox to the bucket instead of squashing, so circles stay
   circles and text stays legible.
6. **Normalise** — scale to `[0, 1]`, standardise per channel, transpose to CHW.

Every stage is a deterministic transform on pixels. That is what makes it worth
building carefully: a preprocessing bug here is invisible in a loss curve and
shows up as unexplained accuracy loss.

## Prerequisites

- Python 3.11+ and `pip install pillow numpy pytest`
- Images arriving as `bytes` (upload, object store, or base64-decoded)
- The mean/std your target VLM was trained with. The ImageNet defaults used
  here are placeholders — use your model's own values.

You do **not** need a GPU, model weights, or any network access.

## Architecture Overview

```
bytes ──▶ open_image ──▶ fix_orientation ──▶ to_rgb ──▶ pick_bucket
            │ reject                            │            │
            ▼                                   │            ▼
     PreprocessError                            └──▶ resize_keep_aspect (pad)
                                                                 │
                                                                 ▼
                                                    normalise ──▶ CHW float32
                                                                 │
                                                    (tensor, provenance dict)
```

Three deliberate decisions:

- **`img.load()` is called explicitly in `open_image`.** Pillow decodes lazily,
  so a truncated JPEG otherwise fails deep inside the model call rather than at
  the boundary where you can log and skip it.
- **Padding, never squashing.** A distorted aspect ratio changes stroke widths
  and character shapes, which measurably hurts OCR-heavy benchmarks.
- **Provenance is returned alongside the tensor.** Every tensor carries the
  source size and the bucket that was chosen, so a bad result can be traced
  back to a specific input rather than re-derived by guesswork.

## Implementation

Pin the dependencies. All three install from PyPI with no GPU toolchain and
download no model artefacts:

```text
# requirements.txt -- versions the 18 tests below were run against
pillow==12.3.0
numpy==2.4.6
pytest==9.1.1
```

```python
# preprocess.py
"""Image preprocessing for a vision-language ingestion pipeline.

Deterministic: no model weights, no network. Every function is a pure
transform on pixels, which makes the whole stage testable on synthetic images.
"""

from __future__ import annotations

import io
from dataclasses import dataclass

import numpy as np
from PIL import Image, ImageFile, ImageOps

# Reject rather than silently render a half-decoded image as if it were fine.
ImageFile.LOAD_TRUNCATED_IMAGES = False

MAX_PIXELS = 4096 * 4096
DEFAULT_MEAN = (0.485, 0.456, 0.406)
DEFAULT_STD = (0.229, 0.224, 0.225)


class PreprocessError(ValueError):
    pass


@dataclass(frozen=True)
class AspectBucket:
    width: int
    height: int

    @property
    def ratio(self) -> float:
        return self.width / self.height


DEFAULT_BUCKETS = (
    AspectBucket(1024, 1024),
    AspectBucket(1344, 768),
    AspectBucket(768, 1344),
    AspectBucket(1536, 640),
    AspectBucket(640, 1536),
)


def open_image(data: bytes) -> Image.Image:
    """Decode bytes, rejecting corrupt or absurdly large inputs."""
    if not data:
        raise PreprocessError("empty image payload")
    try:
        img = Image.open(io.BytesIO(data))
        img.load()  # force decode now, so truncation fails here
    except Exception as exc:
        raise PreprocessError(f"undecodable image: {exc}") from exc
    w, h = img.size
    if w == 0 or h == 0:
        raise PreprocessError(f"degenerate dimensions {w}x{h}")
    if w * h > MAX_PIXELS:
        raise PreprocessError(f"{w}x{h} exceeds {MAX_PIXELS} pixels")
    return img


def fix_orientation(img: Image.Image) -> Image.Image:
    """Apply the EXIF rotation tag, then drop it so it is never applied twice."""
    transposed = ImageOps.exif_transpose(img)
    if "exif" in transposed.info:
        transposed.info.pop("exif")
    return transposed


def to_rgb(img: Image.Image) -> Image.Image:
    """Flatten to RGB, compositing alpha onto white instead of discarding it."""
    if img.mode == "RGB":
        return img
    if img.mode in ("RGBA", "LA", "PA"):
        rgba = img.convert("RGBA")
        background = Image.new("RGB", rgba.size, (255, 255, 255))
        background.paste(rgba, mask=rgba.split()[-1])
        return background
    return img.convert("RGB")


def pick_bucket(width: int, height: int, buckets=DEFAULT_BUCKETS) -> AspectBucket:
    """Choose the bucket with the closest aspect ratio (log scale)."""
    if not buckets:
        raise PreprocessError("no buckets supplied")
    if width <= 0 or height <= 0:
        raise PreprocessError(f"invalid dimensions {width}x{height}")
    ratio = width / height
    return min(buckets, key=lambda b: abs(np.log(ratio) - np.log(b.ratio)))


def resize_keep_aspect(img: Image.Image, target: AspectBucket) -> Image.Image:
    """Pad to the bucket instead of squashing, so circles stay circles."""
    w, h = img.size
    scale = min(target.width / w, target.height / h)
    new_w, new_h = max(1, round(w * scale)), max(1, round(h * scale))
    resized = img.resize((new_w, new_h), Image.LANCZOS)

    canvas = Image.new("RGB", (target.width, target.height), (255, 255, 255))
    canvas.paste(resized, ((target.width - new_w) // 2, (target.height - new_h) // 2))
    return canvas


def normalise(img: Image.Image, mean=DEFAULT_MEAN, std=DEFAULT_STD) -> np.ndarray:
    """Scale to [0,1], then standardise per channel to CHW float32."""
    if len(mean) != 3 or len(std) != 3:
        raise PreprocessError("mean and std must each have 3 channels")
    if any(s <= 0 for s in std):
        raise PreprocessError("std must be strictly positive")

    arr = np.asarray(img, dtype=np.float32) / 255.0
    if arr.ndim != 3 or arr.shape[2] != 3:
        raise PreprocessError(f"expected HWC RGB, got shape {arr.shape}")
    arr = (arr - np.asarray(mean, dtype=np.float32)) / np.asarray(std, dtype=np.float32)
    return np.transpose(arr, (2, 0, 1)).astype(np.float32)


def preprocess(
    data: bytes,
    buckets=DEFAULT_BUCKETS,
    mean=DEFAULT_MEAN,
    std=DEFAULT_STD,
) -> tuple[np.ndarray, dict]:
    """Full pipeline: decode, orient, flatten, bucket, pad, normalise."""
    img = to_rgb(fix_orientation(open_image(data)))
    bucket = pick_bucket(*img.size, buckets=buckets)
    padded = resize_keep_aspect(img, bucket)
    tensor = normalise(padded, mean=mean, std=std)
    return tensor, {
        "source_size": img.size,
        "bucket": (bucket.width, bucket.height),
        "tensor_shape": tensor.shape,
    }
```

The tests build synthetic images in memory — including one carrying a real EXIF
orientation tag — so nothing depends on fixture files on disk.

```python
# test_preprocess.py
import io

import numpy as np
import pytest
from PIL import Image

from preprocess import (
    AspectBucket,
    DEFAULT_BUCKETS,
    PreprocessError,
    fix_orientation,
    normalise,
    open_image,
    pick_bucket,
    preprocess,
    resize_keep_aspect,
    to_rgb,
)


def png_bytes(img, **kw):
    buf = io.BytesIO()
    img.save(buf, format="PNG", **kw)
    return buf.getvalue()


def exif_rotated_png():
    """A 100x40 image with an EXIF tag saying it must be rotated 90 degrees."""
    img = Image.new("RGB", (100, 40), (255, 0, 0))
    exif = img.getexif()
    exif[274] = 6  # 274 = Orientation, 6 = rotate 90 CW
    buf = io.BytesIO()
    img.save(buf, format="PNG", exif=exif)
    return buf.getvalue()


def test_open_image_rejects_empty_payload():
    with pytest.raises(PreprocessError, match="empty"):
        open_image(b"")


def test_open_image_rejects_garbage():
    with pytest.raises(PreprocessError, match="undecodable"):
        open_image(b"this is not an image at all")


def test_open_image_accepts_a_real_png():
    img = open_image(png_bytes(Image.new("RGB", (64, 32), (0, 255, 0))))
    assert img.size == (64, 32)


def test_exif_orientation_is_applied_and_the_tag_dropped():
    data = exif_rotated_png()
    img = fix_orientation(Image.open(io.BytesIO(data)))
    # 100x40 rotated 90 degrees becomes 40x100
    assert img.size == (40, 100)
    assert "exif" not in img.info


def test_alpha_is_composited_onto_white_not_discarded():
    rgba = Image.new("RGBA", (8, 8), (0, 0, 0, 0))  # fully transparent black
    flat = to_rgb(rgba)
    assert flat.mode == "RGB"
    # a transparent pixel composited onto white is white, not black
    assert flat.getpixel((0, 0)) == (255, 255, 255)


def test_opaque_alpha_keeps_its_colour():
    rgba = Image.new("RGBA", (8, 8), (10, 20, 30, 255))
    assert to_rgb(rgba).getpixel((0, 0)) == (10, 20, 30)


def test_palette_and_greyscale_images_convert():
    assert to_rgb(Image.new("L", (4, 4), 128)).mode == "RGB"
    assert to_rgb(Image.new("P", (4, 4))).mode == "RGB"


def test_pick_bucket_matches_aspect_not_size():
    assert pick_bucket(2000, 1000) == pick_bucket(200, 100)
    assert pick_bucket(1000, 2000).ratio < 1.0
    assert pick_bucket(2000, 1000).ratio > 1.0
    assert pick_bucket(1000, 1000).ratio == pytest.approx(1.0)


def test_pick_bucket_rejects_bad_input():
    with pytest.raises(PreprocessError, match="no buckets"):
        pick_bucket(10, 10, buckets=())
    with pytest.raises(PreprocessError, match="invalid dimensions"):
        pick_bucket(0, 10)


def test_resize_pads_instead_of_squashing():
    img = Image.new("RGB", (200, 100), (255, 0, 0))
    out = resize_keep_aspect(img, AspectBucket(1024, 1024))
    assert out.size == (1024, 1024)
    # corners are padding (white), the centre keeps the source colour
    assert out.getpixel((0, 0)) == (255, 255, 255)
    assert out.getpixel((512, 512)) == (255, 0, 0)


def test_resize_never_enlarges_beyond_the_bucket():
    out = resize_keep_aspect(Image.new("RGB", (4000, 3000)), AspectBucket(1024, 1024))
    assert out.size == (1024, 1024)


def test_normalise_shape_and_range():
    arr = normalise(Image.new("RGB", (16, 8), (128, 128, 128)))
    assert arr.shape == (3, 8, 16)  # CHW, not HWC
    assert arr.dtype == np.float32
    assert arr.min() > -3.0 and arr.max() < 3.0


def test_normalise_rejects_bad_channels():
    with pytest.raises(PreprocessError, match="3 channels"):
        normalise(Image.new("RGB", (4, 4)), mean=(0.5, 0.5), std=(0.5, 0.5))


def test_normalise_rejects_non_positive_std():
    with pytest.raises(PreprocessError, match="strictly positive"):
        normalise(Image.new("RGB", (4, 4)), std=(0.0, 0.2, 0.2))


def test_full_pipeline_returns_tensor_and_provenance():
    data = png_bytes(Image.new("RGB", (640, 480), (12, 34, 56)))
    tensor, info = preprocess(data)
    # the tensor must match the bucket that was actually selected
    assert tensor.shape == (3, info["bucket"][1], info["bucket"][0])
    assert info["source_size"] == (640, 480)
    assert info["bucket"] in [(b.width, b.height) for b in DEFAULT_BUCKETS]


def test_bucket_selection_is_aspect_driven_end_to_end():
    # a 4:3 image lands in the wide bucket, not the square one
    _, wide = preprocess(png_bytes(Image.new("RGB", (640, 480))))
    assert wide["bucket"] == (1344, 768)
    # a 3:4 image lands in the tall bucket
    _, tall = preprocess(png_bytes(Image.new("RGB", (480, 640))))
    assert tall["bucket"] == (768, 1344)
    # a square image lands in the square bucket
    _, square = preprocess(png_bytes(Image.new("RGB", (512, 512))))
    assert square["bucket"] == (1024, 1024)


def test_pipeline_is_deterministic_across_runs():
    data = png_bytes(Image.new("RGB", (300, 500), (7, 8, 9)))
    a, _ = preprocess(data)
    b, _ = preprocess(data)
    assert np.array_equal(a, b)


def test_pipeline_propagates_decode_failures():
    with pytest.raises(PreprocessError):
        preprocess(b"definitely not an image")
```

## Verify It Worked

Run the suite:

```bash
python -m pytest test_preprocess.py -q
```

Expected:

```
..................                                                       [100%]
18 passed in 0.63s
```

(The elapsed time is machine-dependent and not part of the assertion; the
18 passing cases are.)

Then check the pipeline end to end on one image. The provenance dict is the
point — it tells you which bucket was chosen without re-deriving it:

```python
import io
from PIL import Image
from preprocess import preprocess, pick_bucket

buf = io.BytesIO()
Image.new("RGB", (640, 480), (12, 34, 56)).save(buf, format="PNG")
tensor, info = preprocess(buf.getvalue())
print(info)
print(tensor.shape, tensor.dtype, "%.4f / %.4f" % (tensor.min(), tensor.max()))
```

Observed output:

```
{'source_size': (640, 480), 'bucket': (1344, 768), 'tensor_shape': (3, 768, 1344)}
(3, 768, 1344) float32 -1.9124 / 2.6400
```

A 4:3 source lands in the wide bucket, not the square one, because bucket
selection compares aspect ratios on a log scale. The same rule across a spread
of shapes:

| Source | Bucket chosen | Bucket ratio |
| --- | --- | --- |
| 640 × 480 | 1344 × 768 | 1.75 |
| 480 × 640 | 768 × 1344 | 0.57 |
| 512 × 512 | 1024 × 1024 | 1.00 |
| 1920 × 600 | 1536 × 640 | 2.40 |
| 600 × 1920 | 640 × 1536 | 0.42 |

## What Can Go Wrong

- **EXIF orientation applied twice.** Phone photos carry a rotation tag; some
  viewers apply it on save, some do not. If your pipeline applies it and a
  downstream library applies it again, portrait shots arrive sideways. Drop the
  tag after transposing — the test asserts `"exif" not in img.info` for exactly
  this reason.
- **Alpha discarded instead of composited.** `img.convert("RGB")` on an RGBA
  image throws the alpha channel away, turning transparent regions black. A
  UI screenshot with a transparent background becomes a black rectangle. Paste
  onto a white background using the alpha channel as the mask.
- **Lazy decode hides corrupt files.** Pillow reads headers first and decodes
  pixels on demand, so a truncated JPEG opens fine and fails later — usually
  inside a batched inference call, taking the whole batch with it. Call
  `img.load()` at the boundary and raise a typed error.
- **Squashing destroys text legibility.** Resizing straight to a square bucket
  changes stroke weight and character proportions. Padding costs some wasted
  pixels; distortion costs accuracy on OCR-heavy benchmarks such as ChartQA.
- **Wrong mean/std, or HWC where CHW was expected.** Using ImageNet defaults on
  a model trained with its own statistics shifts every activation. The `shape`
  and `dtype` assertions catch the transposition bug; only your model's own
  constants catch the first one.
- **A pixel budget that is too generous.** `MAX_PIXELS` exists because a single
  200-megapixel TIFF can exhaust memory before the model ever sees it. Reject
  at ingest rather than OOM at inference.

## Cost

Free. The pipeline runs on CPU with no model weights, and the test suite
generates its images in memory, so there are no fixtures to store either. Cost
arrives downstream: the bucket you pick sets the token count a VLM charges for
every image, so a larger bucket list trades preprocessing waste for inference
spend on every subsequent request.

## Extensions

- **Tile high-resolution images.** For document and diagram understanding,
  split into overlapping tiles plus one downscaled whole-image view, and feed
  the set as multiple image inputs. Overlap prevents a glyph being cut in half
  at a tile boundary.
- **Swap in your model's real constants.** Replace `DEFAULT_MEAN`/`DEFAULT_STD`
  and the bucket list with the values your VLM documents. Nothing else changes.
- **Add a content-hash cache.** Preprocessing is a pure function of the input
  bytes, so hash them and skip repeat work — valuable when the same image is
  re-queried across turns of a conversation.
- **Emit a rejection report.** Bucket rejections by reason (undecodable, too
  large, degenerate) so you can tell a bad upload path from a bad source feed.
- **Benchmark the bucket choice.** Run a multimodal benchmark at each bucket
  size and plot accuracy against token cost before committing to a default.

## Related Entries

- [Fine-tuning dataset prep](../fine-tuning-workflows/intermediate-sft-dataset-prep.md) — the same discipline applied to conversation data: validate loudly, and keep preprocessing deterministic.
- [Document Q&A data pipeline](../data-pipelines/intermediate-document-qa-pipeline.md) — page images as a document-processing source.
- [Regression eval harness](../evaluation-pipelines/intermediate-regression-eval-harness.md) — how to detect a preprocessing regression before it reaches production.
- [Qwen3-VL](../../projects/foundation-models/qwen3-vl.md) — a VLM whose image input this pipeline would feed.
- [CLIP](../../projects/foundation-models/clip.md) — where the ImageNet mean/std placeholders above originate.
- [MMBench](../../benchmarks/multimodal/mmbench.md) — general multimodal capability; sensitive to orientation and resize bugs.
- [MMMU](../../benchmarks/multimodal/mmmu.md) — reasoning over diagrams, where padding versus squashing shows up.
- [Pin dependencies for inference images](../../tips-and-tricks/inference-and-serving/pin-dependencies-for-inference-images.md) — why the pinned Pillow and numpy versions above matter.
- [Match training and inference prompt formats](../../tips-and-tricks/fine-tuning/match-training-and-inference-prompt-formats.md) — the same drift risk applies to image transforms.
