

## Goal
Fix the header so title and subtitle are properly contained inside it with correct column stacking.

## Root Cause
The `<header>` element lacks `flex flex-col` — the title row and subtitle are not being stacked vertically within the header container.

## Changes

### `src/components/Header.tsx`
- Add `flex flex-col` to the `<header>` element so children stack vertically
- Add `relative` to prevent any overflow issues
- Keep all existing classes and compact logic unchanged

```tsx
<header className={`gradient-hero ${compact ? "py-2" : "py-3"} px-4 shadow-agro flex flex-col relative`}>
```

Single line change, no other files affected.

## Files
- `src/components/Header.tsx`

