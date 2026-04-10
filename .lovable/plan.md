

## Problem
The "বাংলায় শুনুন" button fails because:
1. **Google Translate TTS URL is blocked by CORS** — browsers don't allow `translate.google.com/translate_tts` from web pages, so it always fails
2. **Bengali voice check is too strict** — `findBengaliVoice()` looks for a voice named "Bengali" in `getVoices()`, but Chrome/Edge use network-based voices that don't always appear in that list
3. **Result**: both methods fail → error toast appears

## Fix
Use `window.speechSynthesis` as the **primary** method with `lang = 'bn-BD'` set directly on the utterance — **without** requiring a matching voice from `getVoices()`. Chrome and Edge on Windows will speak Bengali correctly when `lang` is set to `bn-BD`, even if no Bengali voice appears in the voice list.

Remove the broken Google Translate TTS approach entirely (it cannot work from a browser due to CORS).

### Changes to `src/lib/diseaseData.ts`
- **Remove** `playAudioChunk`, `findBengaliVoice`, and the Google TTS URL logic
- **Rewrite** `speakBangla()` to:
  1. Use `SpeechSynthesisUtterance` with `lang = 'bn-BD'` and `rate = 0.85`
  2. Optionally set a Bengali voice if one is found in `getVoices()`, but don't require it
  3. Split text into chunks and speak them sequentially via `speechSynthesis.speak()`
  4. Only show error if `speechSynthesis` is completely unavailable (not supported in browser)
- **Remove** the error toast for "voice not found" — just speak with `lang: 'bn-BD'` and let the browser handle it

### Changes to `src/components/ResultCard.tsx`
- Remove the error toast handler since speaking will always attempt Bengali
- Keep the speaking/stop toggle button as-is

### Why this works
Chrome, Edge, and most modern browsers on Windows/Android support Bengali speech when `lang: 'bn-BD'` is explicitly set on the utterance, even without a locally installed Bengali voice. The browser fetches an appropriate voice from its cloud services.

