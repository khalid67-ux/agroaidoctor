import { useState } from "react";
import { Loader2, Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";
import CropSelector from "@/components/CropSelector";
import ResultCard from "@/components/ResultCard";
import { PredictionResult, simulatePrediction } from "@/lib/diseaseData";

const Index = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File, previewUrl: string) => {
    setImageFile(file);
    setPreview(previewUrl);
    setResult(null);
    setError(null);
  };

  const handleDetect = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!preview) return;
    setLoading(true);
    setError(null);
    try {
      const prediction = await simulatePrediction(preview, crop || undefined);
      setResult(prediction);
    } catch {
      setError("বিশ্লেষণে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setImageFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setCrop("");
  };

  const hasSideLayout = !!preview;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header compact={hasSideLayout} />

      {!hasSideLayout ? (
        <main className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="max-w-lg mx-auto px-4 py-3 space-y-4">
            <ImageUploader onImageSelect={handleImageSelect} preview={preview} />
            <CropSelector value={crop} onChange={setCrop} />

            <div className="flex justify-center">
              <Button
                onClick={handleDetect}
                disabled={!preview || loading}
                className="w-full max-w-md bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg py-4 shadow-agro disabled:opacity-50"
              >
                <Search className="w-5 h-5 mr-2" />
                🔍 রোগ নির্ণয় করুন
              </Button>
            </div>

            <footer className="text-center text-xs text-muted-foreground pt-4 pb-2 w-full">
              <p>🌾 বাংলাদেশের কৃষকদের জন্য তৈরি</p>
              <p className="mt-1">অ্যাগ্রোএআই ডক্টর © ২০২৬</p>
            </footer>
          </div>
        </main>
      ) : (
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 px-5 py-2 overflow-hidden min-h-0">
          {/* Left column */}
          <div className="flex flex-col space-y-2 min-h-0 overflow-hidden">
            <ImageUploader onImageSelect={handleImageSelect} preview={preview} compact />
            <CropSelector value={crop} onChange={setCrop} />

            <Button
              onClick={handleDetect}
              disabled={!preview || loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base py-3 shadow-agro disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> বিশ্লেষণ চলছে...</>
              ) : (
                <><Search className="w-5 h-5 mr-2" /> 🔍 রোগ নির্ণয় করুন</>
              )}
            </Button>

            {result && (
              <Button variant="outline" onClick={handleReset} className="w-full font-semibold border-primary text-primary hover:bg-accent text-sm py-2">
                <RotateCcw className="w-4 h-4 mr-2" /> 🔄 আরেকটি ছবি পরীক্ষা করুন
              </Button>
            )}
          </div>

          {/* Right column */}
          <div className="flex flex-col min-h-0 overflow-hidden">
            {error && (
              <p className="text-center text-destructive font-medium text-sm mb-2">{error}</p>
            )}

            {result ? (
              <div className="animate-fade-in flex-1">
                <ResultCard result={result} compact />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-muted-foreground text-center text-sm">
                  🔍 রোগ নির্ণয় করতে বাম পাশের বাটনে ক্লিক করুন
                </p>
              </div>
            )}

            <footer className="text-center text-xs text-muted-foreground py-2 w-full shrink-0">
              <p>🌾 বাংলাদেশের কৃষকদের জন্য তৈরি | অ্যাগ্রোএআই ডক্টর © ২০২৬</p>
            </footer>
          </div>
        </main>
      )}
    </div>
  );
};

export default Index;
