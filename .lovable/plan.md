
Goal: stop healthy leaves from being labeled diseased by a fake hash-based detector and replace it with image-driven logic that behaves more realistically.

What I found
- `src/lib/diseaseData.ts` still uses `simulatePrediction(imageData)` based on a hash of the image string, not the actual leaf condition.
- Because of that, any healthy image can still be marked as disease, and any diseased image can be marked healthy.
- Confidence is also partly random, so the result looks “certain” even when it is not.
- `src/pages/Index.tsx` only sends the preview string; there is no real image analysis step.

Plan
1. Replace fake hash prediction with lightweight image analysis
- Update `simulatePrediction` to inspect the uploaded image pixels with Canvas instead of hashing the data URL.
- Extract simple visual signals such as:
  - green dominance for healthy leaves
  - yellow/brown area ratio for blight/rust-like damage
  - white patch ratio for powdery mildew-like symptoms
  - dark spot density for bacterial spot-like symptoms
- Use score thresholds so healthy-looking leaves return `healthy` by default unless disease indicators are strong.

2. Make results deterministic and less misleading
- Remove random confidence generation.
- Compute confidence from the visual scores so the same image gives the same result every time.
- If disease evidence is weak, return healthy or show lower confidence rather than forcing a disease.

3. Improve crop-aware disease mapping
- Use the selected crop to prioritize relevant diseases where possible.
- If no crop is selected, keep a generic fallback.
- This avoids returning unlikely diseases for the wrong crop.

4. Adjust the detect flow
- Update `src/pages/Index.tsx` so prediction can receive the selected crop along with the image.
- Keep the same loading/error flow, but make the analysis based on the actual uploaded image.

5. Make the result wording safer
- In `src/components/ResultCard.tsx`, label the output as a “প্রাথমিক বিশ্লেষণ” when confidence is moderate.
- Keep the healthy message for clearly healthy leaves.
- Optionally add a short note telling users to consult an agricultural expert if symptoms are severe.

Files to update
- `src/lib/diseaseData.ts`
  - replace hash logic with Canvas/image-feature analysis
  - make confidence deterministic
  - optionally add crop-to-disease mapping helpers
- `src/pages/Index.tsx`
  - pass crop into prediction
- `src/components/ResultCard.tsx`
  - refine wording for low/medium confidence results

Technical notes
- This will still be a frontend heuristic, not a true trained AI model.
- It will be much better than the current fake random/hash behavior, but not medically perfect.
- If you want real accuracy later, the next step would be integrating an actual TensorFlow.js model or backend model API.

Verification I will do after implementation
- Test the same healthy image multiple times to confirm the result stays healthy and consistent.
- Test visibly diseased samples to confirm they are no longer frequently marked healthy.
- Verify crop selection changes disease prioritization appropriately.
- Check the full upload → detect → result flow on mobile-sized layout too.
