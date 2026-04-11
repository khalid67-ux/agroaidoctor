

## Goal
Relax the healthy leaf thresholds so that clearly green, disease-free leaves are classified as "✅ সুস্থ পাতা" instead of falling into "Possibly Diseased".

## Root Cause
The current healthy threshold requires `greenRatio > 0.45` AND `totalDiseaseSignal < 0.05`. Many real healthy leaf photos have `greenRatio` between 0.30–0.45 (due to lighting, background, stems) and minor noise in disease signals, causing them to fall into the `possibly_diseased` bucket.

## Changes

### 1. `src/lib/diseaseData.ts` — Relax healthy thresholds

**Healthy detection (lines ~313-322):**
- Lower green threshold from `0.45` → `0.35`
- Raise disease signal tolerance from `0.05` → `0.08`
- Add a green-dominance boost: if `greenRatio >= 0.60`, set minimum confidence to `0.90`
- Base confidence formula: `0.80 + greenRatio * 0.15` (was `0.85 + greenRatio * 0.1`)

**Possibly diseased (lines ~324-335):**
- Narrow this range: only trigger if `greenRatio` is between `0.20–0.35` (was `0.30`)
- Keep disease signal threshold at `< 0.10`
- This prevents healthy leaves from falling into this bucket

**New decision order:**
```text
greenRatio >= 0.35 AND diseaseSignal < 0.08  →  Healthy (conf 80-98%)
greenRatio >= 0.60 AND diseaseSignal < 0.08  →  Healthy (conf 90-98%, boosted)
greenRatio >= 0.20 AND diseaseSignal < 0.10  →  Possibly Diseased (60-79%)
diseaseSignal >= 0.06 with clear winner       →  Disease detected
```

### 2. `src/components/ResultCard.tsx` — Show confidence percentage on healthy card

- For healthy status, display "সুস্থ পাতা (XX% নিশ্চিত)" in the card header
- Ensure no warning messages appear for confident healthy results

## Files
- `src/lib/diseaseData.ts` — threshold adjustments
- `src/components/ResultCard.tsx` — healthy confidence display

