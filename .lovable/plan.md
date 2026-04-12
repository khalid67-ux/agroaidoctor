

## Goal
1. Move the title "অ্যাগ্রোএআই ডক্টর" down slightly (add top margin/padding)
2. Move the subtitle "🌾 AI দিয়ে..." up closer to the title (reduce `mt-1` gap)

## Changes

### `src/components/Header.tsx`
- Add `pt-1` or `mt-1` to the branding row div to push the title down a bit
- Change subtitle's `mt-1` to `mt-0.5` or `-mt-0.5` to bring it closer/up

```tsx
const Header = ({ compact }: HeaderProps) => (
  <header className={`gradient-hero ${compact ? "py-2" : "pt-3 pb-2"} shadow-agro flex flex-col items-stretch relative w-full`}>
    <div className="w-full flex items-center justify-start gap-2 pl-6">
      <Leaf className={`${compact ? "w-6 h-6" : "w-7 h-7"} text-primary-foreground`} />
      <h1 className={`${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"} font-extrabold text-primary-foreground tracking-tight`}>
        অ্যাগ্রোএআই ডক্টর
      </h1>
    </div>
    {!compact && (
      <p className="block w-full text-center text-primary-foreground/80 text-xs md:text-sm font-medium mt-0.5">
        🌾 AI দিয়ে ফসলের পাতার রোগ নির্ণয় করুন
      </p>
    )}
  </header>
);
```

- `pt-3` (was `py-2`) gives the title more breathing room from top
- `mt-0.5` (was `mt-1`) pulls the subtitle closer to the title

## Files
- `src/components/Header.tsx`

