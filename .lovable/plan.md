

## Goal
Replace the browser SpeechSynthesis API with a Supabase Edge Function that proxies Google Translate TTS, ensuring Bengali audio works on all devices.

## Why not Python/Flask?
Lovable is a frontend-only platform — it cannot run a persistent Python server. Instead, we use a **Supabase Edge Function** (serverless, Deno-based) that fetches Bengali audio from Google Translate's TTS endpoint server-side (no CORS issues) and returns the MP3 to the frontend.

## Architecture

```text
User clicks "বাংলায় শুনুন"
  → Frontend sends POST to Edge Function with { text: "..." }
  → Edge Function calls Google Translate TTS (server-side, no CORS)
  → Returns MP3 audio blob
  → Frontend plays it via <audio> element
```

## Changes

### 1. Create Edge Function `supabase/functions/tts/index.ts`
- Accepts POST with `{ text: string }`
- Splits long text into chunks (Google TTS has ~200 char limit per request)
- Fetches MP3 from `https://translate.google.com/translate_tts?ie=UTF-8&tl=bn&client=tw-ob&q=...` for each chunk
- Concatenates MP3 buffers and returns as `audio/mpeg`
- Includes CORS headers
- Input validation with length limit

### 2. Rewrite TTS functions in `src/lib/diseaseData.ts`
- Remove all SpeechSynthesis code (voice caching, waitForVoices, findBengaliVoice, speakChunk, etc.)
- New `speakBangla()`: sends text to the edge function, receives MP3 blob, plays via `new Audio(URL.createObjectURL(blob))`
- New `stopBangla()`: pauses and resets the Audio element
- Keep `SpeakStatus` type and `StatusCallback` pattern unchanged
- Add `'loading'` status for while the audio is being fetched

### 3. Update `src/components/ResultCard.tsx`
- Add `'loading'` to the button states — show a spinner/loading text while audio generates
- Keep existing speaking/stop toggle
- Remove the "device not supported" error toast (no longer relevant)
- Update `SpeakStatus` type import

### 4. Enable Lovable Cloud (Supabase)
- Required for edge function deployment — will set up if not already enabled

## Why this works
- Google Translate TTS supports Bengali (`tl=bn`) reliably
- Server-side fetch avoids CORS blocking
- No API key needed (uses the public `tw-ob` client parameter)
- Works on every device since it just plays an MP3 file

## Files
- **New**: `supabase/functions/tts/index.ts`
- **Edit**: `src/lib/diseaseData.ts` — replace SpeechSynthesis with edge function call
- **Edit**: `src/components/ResultCard.tsx` — add loading state to button

