

## Goal
Update the header to a professional layout: logo + title left-aligned on the first row, subtitle centered below.

## Changes

### `src/components/Header.tsx`

- Remove `text-center` from `<header>`
- **Top row**: `flex items-center justify-start` with left padding — Leaf icon + title inline, left-aligned
- **Second row**: Subtitle `<p>` with `text-center w-full` centered across the full header width
- Keep `compact` behavior: in compact mode, hide subtitle and reduce sizes (same as now)
- Keep all existing classes for colors, fonts, gradient, shadow

```
<header className={`gradient-hero ${compact ? "py-2" : "py-3"} px-4 shadow-agro`}>
  <div className="flex items-center justify-start gap-2">
    <Leaf icon />
    <h1>অ্যাগ্রোএআই ডক্টর</h1>
  </div>
  {!compact && (
    <p className="text-center text-primary-foreground/80 ...">
      🌾 AI দিয়ে ফসলের পাতার রোগ নির্ণয় করুন
    </p>
  )}
</header>
```

No other files changed.

## Files
- `src/components/Header.tsx`

