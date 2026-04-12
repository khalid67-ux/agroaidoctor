

## Goal
Balance header vertical spacing so space above title equals space below subtitle.

## Changes

### `src/components/Header.tsx`
- Header padding: `py-4` (16px top and bottom) when not compact, `py-2` when compact
- Add `justify-center` to the flex column
- Title row: `mb-1` (4px below)
- Subtitle: `mt-1` (4px above), no extra bottom margin

```tsx
const Header = ({ compact }: HeaderProps) => (
  <header
    className={`gradient-hero ${compact ? "py-2" : "py-4"} shadow-agro flex flex-col items-stretch justify-center relative w-full`}
  >
    <div className="w-full flex items-center justify-start gap-2 pl-6 mb-1">
      <Leaf className={`${compact ? "w-6 h-6" : "w-7 h-7"} text-primary-foreground`} />
      <h1
        className={`${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"} font-extrabold text-primary-foreground tracking-tight`}
      >
        অ্যাগ্রোএআই ডক্টর
      </h1>
    </div>
    {!compact && (
      <p className="block w-full text-center text-primary-foreground/80 text-xs md:text-sm font-medium mt-1">
        🌾 AI দিয়ে ফসলের পাতার রোগ নির্ণয় করুন
      </p>
    )}
  </header>
);
```

Key fixes:
- `py-4` gives equal 16px top/bottom padding
- `justify-center` vertically centers the content block
- `mb-1` on title row + `mt-1` on subtitle = symmetric 4px gap between them
- Removed `px-4` (was on header), kept `pl-6` on branding row only

## Files
- `src/components/Header.tsx`

