import { Leaf } from "lucide-react";

interface HeaderProps {
  compact?: boolean;
}

const Header = ({ compact }: HeaderProps) => (
  <header className="gradient-hero h-[60px] overflow-hidden shadow-agro flex flex-col justify-center relative w-full">
    <div className="w-full flex items-center justify-start gap-1 pl-6">
      <Leaf className="w-5 h-5 text-primary-foreground" />
      <h1 className="text-xl md:text-2xl font-extrabold text-primary-foreground tracking-tight leading-tight">
        অ্যাগ্রোএআই ডক্টর
      </h1>
    </div>

    <p className="block w-full text-center text-primary-foreground/100 text-xs md:text-sm font-medium leading-none -translate-y-6">
      🌾 AI দিয়ে ফসলের পাতার রোগ নির্ণয় করুন
    </p>
  </header>
);

export default Header;
