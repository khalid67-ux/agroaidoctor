

## Goal
Restructure the Index page so that **before upload** the layout stays centered as-is, and **after an image is uploaded** the layout switches to a side-by-side two-column view (left: upload/controls, right: result) that fits within the viewport without scrolling. Mobile remains stacked.

## Changes

### `src/pages/Index.tsx` — Layout restructure

**Before upload (`!preview`)**: Keep the current single-column centered layout unchanged — `max-w-lg mx-auto`.

**After upload (`preview` is set)**: Switch to a two-column flex/grid layout:
- Container: `h-[calc(100vh-header_height)]`, `overflow-hidden`, `grid grid-cols-1 md:grid-cols-2 gap-6`
- **Left column**: Image preview, crop selector, detect button, reset button — scrollable within its column if needed (`overflow-y-auto`)
- **Right column**: Error message, ResultCard, footer — scrollable within its column
- Animate the transition with `transition-all duration-300`

**Responsive**: On mobile (`< md`), both columns stack vertically with `overflow-y-auto` on the main container.

**Spacing**: Reduce `py-8` to `py-4` and `space-y-6` to `space-y-4` in the two-column mode to fit within the viewport.

### `src/components/Header.tsx` — Compact when image uploaded

No changes needed — header stays as-is. We'll account for its height (~88px) in the main area calc.

### No other files changed
Colors, fonts, theme, ResultCard, ImageUploader, CropSelector all remain untouched.

## Files
- `src/pages/Index.tsx` — conditional layout switch from centered to two-column grid

