

## Goal
Make the default homepage (before image upload) fit entirely within the viewport on desktop with zero scrolling, while preserving the existing design style. Mobile remains scrollable.

## Changes

### 1. `src/index.css` — Lock html/body height
- Add `html, body { height: 100%; overflow: hidden; }` inside `@layer base`
- Add a mobile override: `@media (max-width: 767px) { html, body { overflow: auto; } }`

### 2. `src/components/Header.tsx` — More compact default header
- Reduce default padding from `py-6` to `py-3`
- Reduce title size from `text-3xl md:text-4xl` to `text-2xl md:text-3xl`
- Reduce icon from `w-10 h-10` to `w-8 h-8`
- Reduce subtitle text size from `text-sm md:text-base` to `text-xs md:text-sm`
- Remove `mb-1` from the title row

### 3. `src/components/ImageUploader.tsx` — Smaller upload box
- Reduce icon container from `w-16 h-16` to `w-12 h-12`
- Reduce icon from `w-8 h-8` to `w-6 h-6`
- Reduce inner padding from `py-4` to `py-2` and outer from `p-8` to `p-5`
- Reduce title from `text-lg` to `text-base`

### 4. `src/pages/Index.tsx` — Vertically center content, remove scroll
- Change default `<main>` from `flex-1 overflow-y-auto` to `flex-1 flex items-center justify-center overflow-hidden`
- Reduce content spacing from `py-8 space-y-6` to `py-3 space-y-4`
- Reduce button padding from `py-6` to `py-4`
- Reduce footer padding from `pt-8 pb-4` to `pt-4 pb-2`

### 5. `src/components/CropSelector.tsx` — Tighten label spacing
- Reduce label margin from `mb-2` to `mb-1`

## Files
- `src/index.css`
- `src/components/Header.tsx`
- `src/pages/Index.tsx`
- `src/components/ImageUploader.tsx`
- `src/components/CropSelector.tsx`

