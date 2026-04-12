import { Leaf } from "lucide-react";

interface HeaderProps {
  compact?: boolean;
}

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

export default Header;
