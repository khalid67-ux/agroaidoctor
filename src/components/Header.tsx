import { Leaf } from "lucide-react";

interface HeaderProps {
  compact?: boolean;
}

const Header = ({ compact }: HeaderProps) => (
  <header className="gradient-hero h-[60px] overflow-hidden shadow-agro flex flex-col justify-center relative w-full">
    <div className="w-full flex items-center justify-start gap-1 pl-6 mt-6 mb-0">
      <Leaf className="w-5 h-5 text-primary-foreground" />
      <h1 className="text-primary-foreground text-xl md:text-2xl font-bold leading-none">অ্যাগ্রোএআই ডক্টর</h1>
    </div>

    <p className="block w-full text-center text-primary-foreground text-base md:text-lg font-semibold leading-tight mt-0 -translate-y-6">
      🌾AI ভিত্তিক ফসলের রোগ নির্ণয়
    </p>
  </header>
);

export default Header;
