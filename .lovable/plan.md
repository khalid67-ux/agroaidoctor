

## Plan: Optimize Layout Spacing and Single-Screen Fit

### Summary
Increase horizontal gap between left/right columns, eliminate all internal scrolling, and ensure everything fits in one viewport.

### Changes

#### 1. `src/pages/Index.tsx` — Increase gap, remove scroll, tighten spacing
- Change grid `gap-6` to `gap-10` for wider horizontal separation
- Remove `overflow-y-auto` from both left and right columns — replace with `overflow-hidden` to prevent any scrollbars
- Reduce `py-3` to `py-2` on the main grid to reclaim vertical space
- Reduce `space-y-3` to `space-y-2` in left column for tighter stacking

#### 2. `src/components/ResultCard.tsx` — Reduce internal spacing in compact mode
- Change compact padding from `p-3` to `p-2`
- Change compact spacing from `space-y-2` to `space-y-1.5`
- Change compact header padding from `px-4 py-2` to `px-3 py-1.5`
- Reduce compact audio button padding from `py-3` to `py-2`
- These reductions ensure the card fits without needing scroll

#### 3. `src/components/ImageUploader.tsx` — Reduce compact image height
- Change compact max height from `max-h-40` to `max-h-32` to leave more room for other elements

### Technical Details
- The viewport is 889x528. Header takes 60px, leaving ~468px for content. With `py-2` (16px total), that's ~452px for the grid content.
- Left column: image (~128px) + crop selector (~40px) + detect button (~44px) + reset button (~36px) + gaps = ~260px — fits.
- Right column: ResultCard header (~36px) + content (~200-250px) + audio button (~36px) + footer (~28px) = ~350px — fits with tighter spacing.
- No colors, fonts, or design elements are changed.

