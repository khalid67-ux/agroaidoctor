import { useCallback, useRef, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  preview: string | null;
  compact?: boolean;
}

const ImageUploader = ({ onImageSelect, preview, compact }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelect(file, e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className={`w-full ${compact ? "" : "max-w-md"} mx-auto`}>
      <div
        className={`relative border-2 border-dashed rounded-xl ${compact ? "p-4" : "p-5"} text-center transition-all cursor-pointer ${
          dragOver ? "border-primary bg-accent" : "border-border bg-card hover:border-primary/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="আপলোড করা পাতার ছবি" className={`w-full ${compact ? "max-h-32" : "max-h-64"} object-contain rounded-lg mx-auto`} />
        ) : (
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <p className="text-foreground font-semibold text-base">পাতার ছবি আপলোড করুন</p>
            <p className="text-muted-foreground text-sm">JPG বা PNG ফাইল টানুন অথবা ক্লিক করুন</p>
            <p className="text-muted-foreground text-xs mt-1">🌿 শুধুমাত্র পরিষ্কার পাতার ছবি দিন</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {preview && (
        <p className="text-center text-sm text-muted-foreground mt-2 flex items-center justify-center gap-1">
          <ImageIcon className="w-4 h-4" /> ছবি নির্বাচিত হয়েছে
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
