

## Plan: Unify Footer Style Across All Views

### Summary
Make the footer consistent in both the initial (no-image) view and the side-by-side (result) view — single line, centered horizontally, pinned at the bottom of the page.

### Changes

#### `src/pages/Index.tsx`

1. **Initial view footer (line 72-75)**: Change from two `<p>` tags to a single line matching the side layout format: `🌾 বাংলাদেশের কৃষকদের জন্য তৈরি | অ্যাগ্রোএআই ডক্টর © ২০২৬`

2. **Move footer outside of both `<main>` blocks**: Pull the footer out of the conditional layouts entirely and place it as a sibling after the `<main>` element, so it's always at the bottom of the `h-screen flex flex-col` container with `shrink-0`. This ensures identical positioning and styling regardless of which view is active.

3. **Footer styling**: `text-center text-xs text-muted-foreground py-1 w-full shrink-0` — single line, horizontally centered, fixed at page bottom.

### Result
```
┌─────────────────────────────────┐
│           Header                │
├─────────────────────────────────┤
│                                 │
│         Main Content            │
│    (either view, flex-1)        │
│                                 │
├─────────────────────────────────┤
│  🌾 বাংলাদেশের কৃষকদের... ২০২৬  │  ← single shared footer
└─────────────────────────────────┘
```

