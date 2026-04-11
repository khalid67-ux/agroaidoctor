

## Problem
On laptop, the browser speaks in English/another language first (sometimes saying a "module name") before attempting Bengali. This happens because:
1. Even with `waitForVoices()`, the 2-second timeout may expire before desktop Chrome loads its cloud Bengali voices
2. When no Bengali voice is found, setting only `lang = 'bn-BD'` is not enough — the browser falls back to its default English voice
3. Voices are only loaded when the user clicks "listen", causing a delay on the first click

## Fix

### Changes to `src/lib/diseaseData.ts`

1. **Pre-warm voices on module load** — call `speechSynthesis.getVoices()` and listen for `voiceschanged` immediately when the file loads, so voices are already cached by the time the user clicks the button

2. **Cache the Bengali voice globally** — store the found Bengali voice in a module-level variable so subsequent calls don't need to wait again

3. **Increase timeout to 3 seconds** on first load, but use cached voice instantly on subsequent calls

4. **If no Bengali voice is found after waiting, do not speak at all** — instead return an error status so the UI can show "এই ডিভাইসে বাংলা ভয়েস নেই" rather than speaking English

5. **Cancel and clear the speech queue before speaking** — call `speechSynthesis.cancel()` and add a small delay before starting new speech to prevent leftover audio from the previous queue bleeding through

### Changes to `src/components/ResultCard.tsx`
- When `speakStatus` is `'error'`, show a toast or inline message in Bangla saying the device does not support Bengali voice, instead of silently speaking English

