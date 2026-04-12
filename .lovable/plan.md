

## Goal
Ensure the title (with logo) is left-aligned and vertically centered within the header, and the subtitle is horizontally centered across the full navbar width — both properly positioned in the middle of their respective spaces.

## Changes

### `src/components/Header.tsx`
- Make the header a `relative` container so the subtitle can be absolutely centered
- Title row: left-aligned with `flex items-center`, vertically centered naturally by header padding
- Subtitle: use `absolute left-0 right-0 bottom` positioning with `text-center` to center it perfectly across the full navbar width, independent of the title position
- Adjust padding so both rows sit cleanly within the header

```tsx
const Header = ({ compact }: HeaderProps) => (
  <header className={`gradient-hero ${compact ? "py-2" : "py-3 pb-7"} px-4 shadow-agro relative w-full`}>
    <div className="flex items-center justify-start gap-2 pl-2">
      <Leaf className={`${compact ? "w-6 h-6" : "w-7 h-7"} text-primary-foreground`} />
      <h1 className={`${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"} font-extrabold text-primary-foreground tracking-tight`}>
        অ্যাগ্রোএআই ডক্টর
      </h1>
    </div>
    {!compact && (
      <p className="absolute bottom-2 left-0 right-0 text-center text-primary-foreground/80 text-xs md:text-sm font-medium">
        🌾 AI দিয়ে ফসলের পাতার রোগ নির্ণয় করুন
      </p>
    )}
  </header>
);
```

Key difference: subtitle uses `absolute` positioning so it's truly centered across the full navbar width regardless of the title's position. Extra `pb-7` on the header ensures space for the absolutely-positioned subtitle.

## Files
- `src/components/Header.tsx`

