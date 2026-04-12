import { Leaf } from "lucide-react";

interface HeaderProps {
  compact?: boolean;
}

const Header = ({ compact }: HeaderProps) => (
  <header className="gradient-hero h-[60px] overflow-hidden shadow-agro flex flex-col justify-center relative w-full">
    <div className="w-full flex items-center justify-start gap-1 pl-6 mt-7 mb-0">
      <Leaf className="w-5 h-5 text-primary-foreground" />
      <h1 className="text-primary-foreground text-xl md:text-2xl font-bold leading-none">অ্যাগ্রোএআই ডক্টর</h1>
    </div>

    <p className="block w-full text-center text-primary-foreground text-base md:text-lg font-semibold leading-tight mt-0 -translate-y-7">
      🌾AI ভিত্তিক ফসলের রোগ নির্ণয়
    </p>
    {/* RIGHT SIDE */}
    <div className="absolute right-6 top-1/2 -translate-y-1/2">
      <span className="flex items-center gap-1 text-xs bg-white text-green-700 px-3 py-1.5 rounded-full font-semibold shadow-md">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        AI Active
      </span>
    </div>
  </header>
);

export default Header;
