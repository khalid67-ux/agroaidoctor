import { Leaf } from "lucide-react";

interface HeaderProps {
  compact?: boolean;
}

const Header = ({ compact }: HeaderProps) => (
  <header
    className={`gradient-hero ${compact ? "py-.5" : "pt-1 pb-1"} shadow-agro flex flex-col items-stretch justify-center relative w-full`}
  >
    <div className="w-full flex items-center justify-start gap-2 pl-6 mt-5 mb-0">
      <Leaf className={`${compact ? "w-6 h-6" : "w-7 h-7"} text-primary-foreground`} />
      <h1
        className={`${compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"} font-extrabold text-primary-foreground tracking-tight`}
      >
        অ্যাগ্রোএআই ডক্টর
      </h1>
    </div>
    {!compact && (
      <p className="block w-full text-center text-primary-foreground/100 text-xs md:text-sm font-medium mt-0 -translate-y-6">
        🌾 AI দিয়ে ফসলের পাতার রোগ নির্ণয় করুন
      </p>
    )}
  </header>
);

export default Header;
