
Goal
- Stop the app from showing the same disease result for both healthy and diseased leaves.

What I found
- `src/lib/diseaseData.ts` still forces a disease result too easily.
- In `simulatePrediction()`, if the image does not pass the healthy threshold, the code immediately goes into the disease path.
- That disease path starts with `bestDiseaseId = "leaf_blight"`, so unclear images can still become the same disease by default.
- The crop mapping can make it even more repetitive by replacing the guess with the first disease for that crop.
- Result: healthy, unclear, and diseased photos can all end up showing the same “রোগ সনাক্ত হয়েছে” output.

Plan
1. Fix the prediction rules in `src/lib/diseaseData.ts`
- Improve the feature scoring so background, shadows, and lighting do not push normal green leaves into the disease branch.
- Add a minimum “real leaf area” check before classifying.
- Rebalance healthy vs disease thresholds so healthy leaves are more likely to stay healthy.

2. Remove the forced default disease
- Stop defaulting unclear cases to `leaf_blight`.
- Only assign a disease when one disease signal is clearly stronger than the others and above a minimum threshold.
- If evidence is weak, do not show a fake disease result.

3. Add an “unclear / retake photo” result
- Extend `PredictionResult` with an `uncertain` state.
- Use it when the photo is blurry, background-heavy, too dark/bright, or has weak disease evidence.
- Show Bangla guidance telling the user to upload a clearer leaf photo instead of showing the wrong disease.

4. Make crop selection safer
- Use selected crop only to prioritize among already plausible diseases.
- Do not let crop selection force the first disease in the list when the detector is unsure.

5. Update the result UI
- Update `src/components/ResultCard.tsx` to render:
  - healthy
  - disease detected
  - unclear / try another photo
- Keep the Bangla messaging simple and clear for each case.
- Update `src/pages/Index.tsx` only if small state or messaging changes are needed.

Files to update
- `src/lib/diseaseData.ts`
- `src/components/ResultCard.tsx`
- `src/pages/Index.tsx` if needed for the new result state

Verification I will do after implementation
- Test with a clearly healthy green leaf so it no longer shows disease by default.
- Test with different diseased-looking leaves so results are not always the same disease.
- Test with blurry/background-heavy images so they show the unclear/retry state.
- Check the full upload → detect → result flow end-to-end, including mobile layout.
