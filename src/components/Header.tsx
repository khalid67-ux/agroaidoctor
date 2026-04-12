import { Leaf } from "lucide-react";

interface HeaderProps {
  compact?: boolean;
}

const Header = ({ compact }: HeaderProps) => (
  <header className="gradient-hero h-[60px] shadow-agro flex items-center relative w-full px-6">
    {/* Left: branding */}
    <div className="flex items-center gap-1.5 z-10">
      <Leaf className="w-5 h-5 text-primary-foreground" />
      <h1 className="text-primary-foreground text-xl md:text-2xl font-bold leading-none">
        অ্যাগ্রোএআই ডক্টর
      </h1>
    </div>

    {/* Center: subtitle */}
    {!compact && (
      <p className="absolute left-1/2 -translate-x-1/2 text-primary-foreground text-base md:text-lg font-semibold whitespace-nowrap">
        🌾 AI ভিত্তিক ফসলের রোগ নির্ণয়
      </p>
    )}

    {/* Right: AI Active badge */}
    <div className="ml-auto z-10">
      <span className="flex items-center gap-1 text-xs bg-white text-green-700 px-3 py-1.5 rounded-full font-semibold shadow-md">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        🤖 AI Active
      </span>
    </div>
  </header>
);

export default Header;
