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

  const handleDetect = async () => {
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

  const handleReset = () => {
    setImageFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setCrop("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <ImageUploader onImageSelect={handleImageSelect} preview={preview} />

        <CropSelector value={crop} onChange={setCrop} />

        {/* Detect button */}
        <div className="flex justify-center">
          <Button
            onClick={handleDetect}
            disabled={!preview || loading}
            className="w-full max-w-md bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg py-6 shadow-agro disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                বিশ্লেষণ চলছে...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                🔍 রোগ নির্ণয় করুন
              </>
            )}
          </Button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-destructive font-medium">{error}</p>
        )}

        {/* Result */}
        {result && <ResultCard result={result} />}

        {/* Reset */}
        {result && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={handleReset} className="font-semibold border-primary text-primary hover:bg-accent">
              <RotateCcw className="w-4 h-4 mr-2" />
              🔄 আরেকটি ছবি পরীক্ষা করুন
            </Button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-muted-foreground pt-8 pb-4">
          <p>🌾 বাংলাদেশের কৃষকদের জন্য তৈরি</p>
          <p className="mt-1">অ্যাগ্রোএআই ডক্টর © ২০২৬</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
