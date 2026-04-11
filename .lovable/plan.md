

## Goal
Add a leaf detection gate before disease classification. Non-leaf images get rejected with a clear error message instead of being incorrectly classified.

## Approach
Use enhanced pixel analysis to compute a "leaf confidence" score based on green dominance, color variance, and texture characteristics. Add a new `'not_leaf'` status to `PredictionResult`.

## Changes

### 1. `src/lib/diseaseData.ts` — Add leaf validation

**New status**: Add `'not_leaf'` to the `PredictionResult.status` union type.

**New function `detectLeaf(features, imageData)`** that computes a leaf confidence score (0-1) based on:
- Green pixel ratio (dominant signal — leaves are green or yellow-green)
- Color diversity check (natural leaves have varied green/brown tones, not uniform artificial colors)
- Edge texture analysis (leaves have organic edges, not sharp geometric ones)
- Saturation check (leaves have natural saturation, not gray/desaturated)

**Leaf rejection criteria** — return `status: 'not_leaf'` if:
- `leafConfidence < 0.70`
- OR `greenRatio < 0.08` AND `yellowBrownRatio < 0.05` (no plant-like colors at all)
- OR image is dominated by blues, reds, or grays with no green presence

**Insert this check** in `simulatePrediction()` right after blur detection and before the existing foreground check. If not a leaf, return immediately with message: "❌ এটি একটি পাতা নয়। অনুগ্রহ করে একটি পাতার ছবি আপলোড করুন"

### 2. `src/components/ResultCard.tsx` — Handle `not_leaf` status

- Add `isNotLeaf` boolean check
- Show a red/destructive styled card with:
  - Header: "❌ পাতা সনাক্ত হয়নি"
  - The rejection message from `uncertainMessage`
  - Helper tip: "শুধুমাত্র পরিষ্কার পাতার ছবি দিন"
- Hide confidence bar, predictions, and audio button for this status

### 3. `src/components/ImageUploader.tsx` — Add helper text

- Add subtle helper text below the upload area: "শুধুমাত্র পরিষ্কার পাতার ছবি দিন" so users know before uploading.

## Files
- `src/lib/diseaseData.ts` — leaf detection logic, new status
- `src/components/ResultCard.tsx` — not_leaf UI
- `src/components/ImageUploader.tsx` — helper text

