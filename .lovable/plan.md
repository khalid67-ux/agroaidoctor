

## Plan: Fix Mobile Audio Playback Delay

### Problem
On mobile browsers, `new Audio()` created **after** an async `fetch()` call loses the user gesture context. Mobile browsers require media playback to be initiated from a direct user interaction. Since the `Audio` object is created after the TTS fetch completes, the browser blocks or delays playback.

### Solution
Create the `Audio` element **synchronously** inside the click handler (before the async fetch), then set its `src` after the fetch completes. This preserves the user gesture context on mobile.

### Changes

#### `src/lib/diseaseData.ts` — Restructure `speakBangla`
- Create `new Audio()` **before** the fetch call (synchronously in gesture context)
- After fetch completes, set `audio.src = objectUrl` instead of creating a new Audio
- Keep all existing event handlers and cleanup logic

```typescript
export async function speakBangla(text: string, onStatus?: StatusCallback) {
  stopBangla();
  onStatus?.('loading');

  // Create Audio element SYNCHRONOUSLY in user gesture context
  const audio = new Audio();
  currentAudio = audio;

  audio.onplay = () => onStatus?.('speaking');
  audio.onended = () => { stopBangla(); onStatus?.('idle'); };
  audio.onerror = () => { stopBangla(); onStatus?.('error'); };

  try {
    // Async fetch — audio element already exists in gesture context
    const response = await fetch(url, { ... });
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    currentObjectUrl = objectUrl;

    // Set src and play — works on mobile because Audio was created in gesture
    audio.src = objectUrl;
    await audio.play();
  } catch (err) {
    stopBangla();
    onStatus?.('error');
  }
}
```

### Why This Works
Mobile Safari and Chrome require the `Audio` object to be created during a user gesture (click/tap). By creating it before the async `fetch`, the browser associates it with the tap event, allowing `.play()` to succeed even after the async gap.

