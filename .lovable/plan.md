

## Goal
Fix the side-by-side layout so both columns fit within the viewport without any scrolling, with the audio button always visible.

## Changes

### 1. `src/components/Header.tsx` — Compact header in side layout
- Accept an optional `compact` prop
- When compact: reduce `py-6` to `py-2`, hide subtitle, shrink icon/title size
- This saves ~40px of vertical space

### 2. `src/pages/Index.tsx` — No-scroll two-column layout
- Pass `compact` to Header when `hasSideLayout`
- Remove `overflow-y-auto` and `min-h-0` from both columns
- Add `overflow-hidden` to both columns so nothing scrolls
- Reduce gap and padding: `gap-3 px-3 py-2`
- Reduce button padding from `py-5` to `py-3`
- Right column: use `flex flex-col h-full justify-between` so ResultCard and footer fill space without overflow

### 3. `src/components/ImageUploader.tsx` — Smaller preview in side mode
- Accept optional `compact` prop
- When compact: reduce `max-h-64` to `max-h-40`, reduce padding from `p-8` to `p-4`

### 4. `src/components/ResultCard.tsx` — Compact card fitting viewport
- Reduce internal padding from `p-5` to `p-3`, `space-y-4` to `space-y-2`
- Reduce header padding from `py-4` to `py-2`
- Reduce audio button padding from `py-5` to `py-3`
- Remove `max-w-md` constraint so card fills available width
- Accept optional `compact` prop to toggle these reductions

### Responsive
- Desktop (`md+`): no scroll anywhere, everything fits
- Mobile (`< md`): allow `overflow-y-auto` on the main container so stacked content can scroll

## Files
- `src/components/Header.tsx`
- `src/pages/Index.tsx`
- `src/components/ImageUploader.tsx`
- `src/components/ResultCard.tsx`

