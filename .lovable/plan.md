

## Goal
Move the title (logo + "অ্যাগ্রোএআই ডক্টর") to the top of the header, ensuring it sits at the very top with the subtitle below it.

## Changes

### `src/components/Header.tsx`
- Add `flex flex-col` to the header so children stack vertically
- Remove `absolute` positioning from subtitle — use normal flow instead
- Title row stays at top naturally as the first flex child
- Subtitle sits below with `w-full text-center mt-1`
- Reduce bottom padding from `pb-7` to `pb-2` since subtitle is no longer absolutely positioned

```tsx
const Header = ({ compact }: HeaderProps) => (
  <header className={`gradient-hero ${compact ? "py-2" : "py-2 pb-2"} px-4 shadow-agro flex flex-col relative w-full`}>
    <div className="flex items-center justify-start gap-2 pl-2">
      <Leaf className={`${compact ? "w-6 h-6" : "w-7 h-7"} text-primary-foreground`} />
      <h1 className={`${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"} font-extrabold text-primary-foreground tracking-tight`}>
        অ্যাগ্রোএআই ডক্টর
      </h1>
    </div>
    {!compact && (
      <p className="w-full text-center text-primary-foreground/80 text-xs md:text-sm font-medium mt-1">
        🌾 AI দিয়ে ফসলের পাতার রোগ নির্ণয় করুন
      </p>
    )}
  </header>
);
```

## Files
- `src/components/Header.tsx`

