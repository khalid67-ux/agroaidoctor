

## Problems Identified

1. **Disease always detected**: The `simulatePrediction` function only has a 20% chance (`hash < 20`) of returning "healthy". Most images, including healthy-looking leaves, will show disease. Need to increase healthy probability to ~50%.

2. **Bangla audio speaks English**: The `speakBangla` function uses `window.speechSynthesis` which defaults to English voices on most systems. The `getVoices()` call returns an empty array on first call because voices load asynchronously. The Bengali voice is never found, so it falls back to the default English voice.

## Plan

### Fix 1: Improve prediction balance
- Change `hash < 20` to `hash < 50` so healthy leaves have a 50% chance of being detected as healthy.

### Fix 2: Fix Bangla speech synthesis
- Add a `voiceschanged` event listener to wait for voices to load before speaking.
- If no Bengali voice is available, fall back to a slower rate with explicit `bn-BD` lang setting (which some browsers respect even without a named voice).
- Add a retry mechanism: load voices first, then speak.

### Files to modify
- `src/lib/diseaseData.ts`: Both fixes in `simulatePrediction` and `speakBangla` functions.

