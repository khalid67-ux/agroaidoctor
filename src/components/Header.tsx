import { Leaf } from "lucide-react";

interface HeaderProps {
  compact?: boolean;
}

const Header = ({ compact }: HeaderProps) => (
  <header className={`gradient-hero ${compact ? "py-2" : "py-6"} px-4 text-center shadow-agro`}>
    <div className="flex items-center justify-center gap-3 mb-1">
      <Leaf className={`${compact ? "w-7 h-7" : "w-10 h-10"} text-primary-foreground`} />
      <h1 className={`${compact ? "text-xl md:text-2xl" : "text-3xl md:text-4xl"} font-extrabold text-primary-foreground tracking-tight`}>
        অ্যাগ্রোএআই ডক্টর
      </h1>
    </div>
    {!compact && (
      <p className="text-primary-foreground/80 text-sm md:text-base font-medium">
        🌾 AI দিয়ে ফসলের পাতার রোগ নির্ণয় করুন
      </p>
    )}
  </header>
);

export default Header;
