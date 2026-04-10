
Goal: make the “বাংলায় শুনুন” button stop speaking English and behave predictably on all devices.

What I found
- `src/lib/diseaseData.ts` still allows an English fallback:
  - it first tries Google Translate TTS via `new Audio(...)`
  - if that fails, it falls back to `window.speechSynthesis`
  - many devices do not have a real Bengali voice, so that fallback can speak English
- There is no user-facing error when Bangla playback is unavailable.
- The button in `src/components/ResultCard.tsx` always stays enabled, so users can retry and get the same bad fallback.

Plan
1. Remove English fallback behavior
- Update `speakBangla()` so it never uses a non-Bengali browser voice.
- If browser speech is used at all, first verify the selected voice is actually Bengali (`bn`, `bn-BD`, `bn-IN`, or Bengali voice name).
- If no Bengali voice exists, do not speak in English.

2. Make remote Bangla audio more robust
- Refactor the Google TTS playback into a controlled async queue instead of recursive loose audio handlers.
- Keep chunking, whitespace cleanup, and sequential playback.
- Track the currently playing audio instance so repeated clicks stop the previous Bangla audio cleanly.

3. Add a safe failure path in Bangla
- If remote audio is blocked/fails and no real Bengali device voice is available, show a Bangla toast/message such as:
  “এই ডিভাইসে বাংলা ভয়েস পাওয়া যায়নি।”
- This is better than speaking English incorrectly.

4. Improve the button UX
- In `src/components/ResultCard.tsx`, add speaking/loading state:
  - “লোড হচ্ছে...”
  - optional stop/replay handling
- Disable rapid repeated clicks while audio is starting.

5. Verify end-to-end
- Test healthy and disease result cards.
- Test on the preview flow after clicking “বাংলায় শুনুন”.
- Confirm outcomes are only:
  - proper Bangla speech, or
  - a Bangla error/toast
- Confirm English speech never happens again.

Files to update
- `src/lib/diseaseData.ts`
  - rebuild `speakBangla`
  - add Bengali-voice detection
  - remove unsafe English fallback
  - manage audio queue/current playback
- `src/components/ResultCard.tsx`
  - add speaking state and clearer feedback
- optionally `src/pages/Index.tsx`
  - only if needed for passing toast/state helpers cleanly

Technical note
- In a frontend-only app, “always Bangla on every device” is only possible if the remote TTS request succeeds.
- The correct fix here is: never fall back to English; instead use Bangla audio when available and show a Bangla error when it is not.
