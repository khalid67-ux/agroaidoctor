

## Goal
Fix header alignment so title is left-aligned and subtitle is centered, with clean column layout.

## Current State
The Header.tsx already has `flex flex-col relative` but the user reports alignment issues. Looking at the code, the structure is correct but may need explicit `items-stretch` instead of default, and the subtitle needs `w-full` to ensure full-width centering.

## Changes

### `src/components/Header.tsx`
- Change header classes: replace `flex flex-col relative` with `flex flex-col items-stretch relative w-full`
- Top row div: add `pl-6` (24px left padding), keep `flex items-center justify-start gap-2`
- Subtitle `<p>`: ensure it's a separate block outside the flex row with `text-center w-full mt-1.5` — remove any flex parent influence

```tsx
const Header = ({ compact }: HeaderProps) => (
  <header className={`gradient-hero ${compact ? "py-2" : "py-3"} px-4 shadow-agro flex flex-col items-stretch relative w-full`}>
    <div className="flex items-center justify-start gap-2 pl-2">
      <Leaf className={`${compact ? "w-6 h-6" : "w-7 h-7"} text-primary-foreground`} />
      <h1 className={`${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"} font-extrabold text-primary-foreground tracking-tight`}>
        অ্যাগ্রোএআই ডক্টর
      </h1>
    </div>
    {!compact && (
      <p className="w-full text-center text-primary-foreground/80 text-xs md:text-sm font-medium mt-1.5">
        🌾 AI দিয়ে ফসলের পাতার রোগ নির্ণয় করুন
      </p>
    )}
  </header>
);
```

## Files
- `src/components/Header.tsx`

