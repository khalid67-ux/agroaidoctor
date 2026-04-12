import { crops } from "@/lib/diseaseData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CropSelectorProps {
  value: string;
  onChange: (v: string) => void;
}

const CropSelector = ({ value, onChange }: CropSelectorProps) => (
  <div className="w-full max-w-md mx-auto">
    <label className="block text-sm font-semibold text-foreground mb-1">🌱 ফসল নির্বাচন করুন (ঐচ্ছিক)</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-card border-border">
        <SelectValue placeholder="ফসল বেছে নিন" />
      </SelectTrigger>
      <SelectContent>
        {crops.map(c => (
          <SelectItem key={c.id} value={c.id}>{c.name_bn} ({c.name_en})</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default CropSelector;
