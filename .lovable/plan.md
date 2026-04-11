

## Problem
On laptop/desktop, `window.speechSynthesis.getVoices()` often returns an empty array on the first call because voices load asynchronously. Without a Bengali voice explicitly set, the browser defaults to English. On mobile (Android Chrome), Bengali cloud voices load faster or the OS has them built-in, so it works.

## Fix
Wait for voices to load before speaking, and ensure the Bengali voice is set properly on desktop browsers.

### Changes to `src/lib/diseaseData.ts`

1. **Add a `waitForVoices()` helper** that returns a Promise resolving when `getVoices()` is populated (using the `voiceschanged` event with a timeout fallback of ~2 seconds).

2. **Update `speakChunk()`** to call `waitForVoices()` first, then search for a Bengali voice. This ensures desktop Chrome/Edge have time to load their network-based Bengali voices before the utterance is created.

3. **Force `utterance.voice`** to the Bengali voice when found. If no Bengali voice is found after waiting, still set `lang = 'bn-BD'` and attempt to speak (some browsers handle it).

### No other files need changes
`ResultCard.tsx` already handles the speaking/stop toggle correctly.

### Why this fixes it
Desktop Chrome loads voices asynchronously via the `voiceschanged` event. The current code calls `getVoices()` synchronously, gets an empty list, sets no voice, and the browser picks its default English voice. By waiting for voices to load, we get access to Chrome's cloud Bengali voice (`Google বাংলা`) and can set it explicitly.

