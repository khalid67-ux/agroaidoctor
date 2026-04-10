

## Problem
The "বাংলায় শুনুন" button speaks in English because most browsers/devices don't have a Bengali voice installed in `window.speechSynthesis`. The current code sets `lang = 'bn-BD'` but if no Bengali voice exists, the browser uses its default English voice.

## Solution
Replace the browser `speechSynthesis` approach with the **Web Speech API + Google Translate TTS fallback**. This uses a hidden `<audio>` element to play Bangla audio from Google Translate's TTS endpoint, which always speaks Bengali regardless of the user's device.

### Changes to `src/lib/diseaseData.ts`
- Rewrite `speakBangla()` to:
  1. Split long text into chunks under 200 characters (Google TTS limit)
  2. Play each chunk sequentially using `https://translate.google.com/translate_tts?ie=UTF-8&tl=bn&client=tw-ob&q=...`
  3. Fall back to browser `speechSynthesis` with `bn-BD` only if audio playback fails
  4. Clean up newline characters and extra whitespace before sending to TTS

### No other files need changes
- `ResultCard.tsx` already calls `speakBangla()` correctly with the right Bangla text

## Technical Note
Google Translate TTS is a free endpoint that reliably speaks Bengali. It has a ~200 character limit per request, so longer text is split into sentences and played sequentially. This works on all browsers and devices without any API key.

