

## Goal
Improve detection accuracy by raising the healthy threshold, adding a "possibly diseased" state, showing top-2 predictions, adding blur detection, and improving the UI to clearly show uncertain results.

## Changes

### 1. Update `PredictionResult` interface in `src/lib/diseaseData.ts`
- Add new status `'possibly_diseased'` to the status union
- Add `topPredictions` array field: `{ disease: DiseaseInfo; confidence: number }[]`
- Add `blurScore` optional field for image quality

### 2. Rewrite `simulatePrediction()` in `src/lib/diseaseData.ts`

**Blur detection**: Calculate a Laplacian-like variance on grayscale pixel values. If below threshold, return uncertain with "ছবি ঝাপসা" message.

**Stricter healthy threshold**:
- Only return `status: 'healthy'` if `greenRatio > 0.45` AND `totalDiseaseSignal < 0.05` AND confidence >= 0.85
- If green is dominant but confidence < 0.85 (e.g. greenRatio 0.3-0.45 with low disease signal), return `status: 'possibly_diseased'` with message "⚠️ ফলাফল নিশ্চিত নয়"

**Top-2 predictions**: Always compute scores for all 4 diseases, normalize them into percentages, and return the top 2 with nonzero scores in `topPredictions`.

**Canvas resize**: Change from max 200px to fixed 224x224 for consistent analysis.

### 3. Update `src/components/ResultCard.tsx`

- Handle new `'possibly_diseased'` status with yellow/warning styling and the message "⚠️ সম্ভবত রোগাক্রান্ত — নিশ্চিত নয়"
- Display `topPredictions` as a ranked list showing disease name + percentage for each
- Show confidence bar for all states (including uncertain)
- For `possibly_diseased`: show the warning "⚠️ ফলাফল নিশ্চিত নয়, আবার চেষ্টা করুন" prominently
- For blurry images: show specific blur warning message

### 4. Update `src/pages/Index.tsx`
- Update `PredictionResult` type usage (no logic changes needed, just the import)

## Key thresholds summary

```text
greenRatio > 0.45 AND diseaseSignal < 0.05  →  Healthy (conf >= 85%)
greenRatio > 0.30 AND diseaseSignal < 0.10  →  Possibly Diseased (conf 60-84%)
diseaseSignal >= 0.06 with clear winner      →  Disease detected
blurVariance < threshold                     →  "ছবি ঝাপসা, পরিষ্কার ছবি তুলুন"
foreground < 15%                             →  "পাতা দেখা যাচ্ছে না"
```

## Files to change
- `src/lib/diseaseData.ts` — prediction logic, types, blur detection, top-2, stricter thresholds
- `src/components/ResultCard.tsx` — new `possibly_diseased` UI, top predictions list, blur warning

