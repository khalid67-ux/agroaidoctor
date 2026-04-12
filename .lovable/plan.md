

## Plan: Improve UI/UX and Behavior of AgroAI Doctor

### Summary
Improve spacing, visibility, button behavior, animations, and footer alignment without changing colors or branding.

### Changes

#### 1. `src/pages/Index.tsx` — Layout, spacing, button behavior, animations
- Add `gap-6` between left/right columns (currently `gap-3`)
- Add padding adjustments for balanced feel (`px-4 py-3` → `px-5 py-3`)
- Wrap result display in a div with `animate-fade-in` class for smooth appearance
- Make the right column use `overflow-y-auto` so the full result card (including audio button) is always scrollable/visible
- Ensure buttons use `e.preventDefault()` — currently they're plain `<Button>` (not inside forms), so no form submission issue exists. The `handleDetect` and `handleReset` already do client-side state updates only. No changes needed here as behavior is already correct.
- Center footer text consistently in both layouts

#### 2. `src/components/Header.tsx` — Fix alignment
- Keep current design but ensure proper structure: left title row, centered subtitle, right AI Active badge
- The `mt-7` and `-translate-y-7` values are fighting each other; simplify to a clean single-row or proper flex layout within the fixed `h-[60px]`

#### 3. `src/components/ResultCard.tsx` — Ensure audio button visibility
- No structural changes needed; the parent container fix in Index.tsx (overflow-y-auto) will handle visibility

#### 4. `src/components/ImageUploader.tsx` — Minor spacing
- Compact mode: ensure image doesn't consume too much vertical space

#### 5. `src/index.css` — No changes to colors/variables
- The `animate-fade-in` keyframe already exists in tailwind config

### Technical Details

**Index.tsx side-by-side layout changes:**
- Grid gap: `gap-3` → `gap-6`
- Right column: add `overflow-y-auto` with `min-h-0` to allow scrolling if content overflows
- Left column: add `min-h-0` for proper flex containment
- Wrap `<ResultCard>` in `<div className="animate-fade-in">`
- Footer in both layouts: ensure `text-center` with full width

**Header.tsx restructure:**
- Use a single flex row with `justify-between items-center` inside the fixed-height header
- Left: icon + title
- Center: subtitle (use `absolute left-1/2 -translate-x-1/2` for true centering)
- Right: AI Active badge (already absolute positioned)

**No changes to:** colors, branding, fonts, diseaseData.ts, CropSelector design, or core component APIs.

