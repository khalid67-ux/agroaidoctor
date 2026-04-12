

## Plan: Compact Result Card, Widen Gap, Fix Left Buttons

### Summary
Make the result card smaller so footer is visible, increase the gap between left and right columns, and ensure the 3 left-side elements (crop selector, detect button, reset button) have equal width alignment.

### Changes

#### 1. `src/pages/Index.tsx` — Layout fixes
- Increase grid gap from `gap-10` to `gap-14` for more horizontal space
- Left column: remove `max-w-md` from CropSelector wrapper constraint, ensure all 3 interactive elements (CropSelector, Detect button, Reset button) stretch to full width equally
- Right column: make result area use `overflow-y-auto` with `flex-1 min-h-0` so it scrolls if needed but footer always stays visible at the bottom
- Always show the reset button (not conditionally) so left column height stays consistent — or use `mt-auto` on footer to push it down

#### 2. `src/components/ResultCard.tsx` — Make compact mode smaller
- Reduce text sizes in compact mode: disease name `text-base` to `text-sm`, confidence `text-xl` to `text-lg`
- Reduce `space-y-2` in disease details to `space-y-1`
- Reduce description/solution `leading-relaxed` to `leading-snug` in compact mode
- Make compact header icon smaller: `w-5 h-5` instead of `w-6 h-6`
- Reduce top predictions padding from `p-2` to `p-1.5`
- These changes shrink the card enough to show footer + audio button within viewport

#### 3. `src/components/CropSelector.tsx` — Remove max-width constraint
- Remove `max-w-md` so it stretches to match the full column width, aligning with the buttons below it

### Technical Details
- Viewport: 889x528. Header: 60px. Remaining: ~460px.
- With tighter ResultCard compact spacing, the card should fit in ~350px, leaving room for footer.
- Left column buttons already use `w-full`; the issue is CropSelector has `max-w-md` creating width mismatch.
- Gap increase from `gap-10` (40px) to `gap-14` (56px) adds 16px more separation.

