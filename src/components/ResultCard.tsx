import { useState } from "react";
import { CheckCircle, AlertTriangle, HelpCircle, Volume2, VolumeX, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PredictionResult, HEALTHY_MESSAGE, speakBangla, stopBangla, SpeakStatus } from "@/lib/diseaseData";
import { toast } from "sonner";

interface ResultCardProps {
  result: PredictionResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const isHealthy = result.status === "healthy";
  const isUncertain = result.status === "uncertain";
  const isPossiblyDiseased = result.status === "possibly_diseased";
  const isDiseased = result.status === "disease";
  const isNotLeaf = result.status === "not_leaf";
  const confidence = Math.round(result.confidence * 100);
  const [speakStatus, setSpeakStatus] = useState<SpeakStatus>('idle');

  const handleSpeak = () => {
    if (speakStatus === 'speaking' || speakStatus === 'loading') {
      stopBangla();
      setSpeakStatus('idle');
      return;
    }

    let text = '';
    if (isHealthy) {
      text = HEALTHY_MESSAGE;
    } else if (isUncertain || isPossiblyDiseased) {
      text = result.uncertainMessage || "ছবি থেকে রোগ সনাক্ত করা যায়নি।";
      if (result.topPredictions && result.topPredictions.length > 0) {
        text += " সম্ভাব্য রোগ: " + result.topPredictions.map(p =>
          `${p.disease.name_bn} ${Math.round(p.confidence * 100)} শতাংশ`
        ).join(", ");
      }
    } else if (result.disease) {
      text = `রোগের নাম: ${result.disease.name_bn}। সমস্যা: ${result.disease.description_bn}। সমাধান: ${result.disease.solution_bn}`;
    }

    if (!text) return;

    speakBangla(text, (status) => {
      setSpeakStatus(status);
      if (status === 'error') {
        toast.error("অডিও তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    });
  };

  const getHeaderStyle = () => {
    if (isHealthy) return "gradient-hero";
    if (isNotLeaf) return "bg-destructive";
    if (isPossiblyDiseased) return "bg-warning";
    if (isUncertain) return "bg-muted";
    return "bg-destructive";
  };

  const getBorderStyle = () => {
    if (isHealthy) return "border-success/30 bg-accent";
    if (isNotLeaf) return "border-destructive/40 bg-destructive/5";
    if (isPossiblyDiseased) return "border-warning/30 bg-warning/5";
    if (isUncertain) return "border-muted-foreground/20 bg-muted/30";
    return "border-destructive/30 bg-destructive/5";
  };

  const getHeaderIcon = () => {
    if (isHealthy) return <CheckCircle className="w-7 h-7 text-primary-foreground" />;
    if (isNotLeaf) return <AlertTriangle className="w-7 h-7 text-destructive-foreground" />;
    if (isPossiblyDiseased) return <ShieldAlert className="w-7 h-7 text-primary-foreground" />;
    if (isUncertain) return <HelpCircle className="w-7 h-7 text-foreground" />;
    return <AlertTriangle className="w-7 h-7 text-destructive-foreground" />;
  };

  const getHeaderText = () => {
    if (isHealthy) return `সুস্থ পাতা (${confidence}% নিশ্চিত) ✅`;
    if (isNotLeaf) return "❌ পাতা সনাক্ত হয়নি";
    if (isPossiblyDiseased) return "সম্ভবত রোগাক্রান্ত ⚠️";
    if (isUncertain) return "ছবি অস্পষ্ট 🔄";
    return "রোগ সনাক্ত হয়েছে ⚠️";
  };

  return (
    <div className={`w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-agro border ${getBorderStyle()}`}>
      {/* Status header */}
      <div className={`px-5 py-4 flex items-center gap-3 ${getHeaderStyle()}`}>
        {getHeaderIcon()}
        <span className={`font-bold text-lg ${isUncertain ? "text-foreground" : "text-primary-foreground"}`}>
          {getHeaderText()}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Not a leaf */}
        {isNotLeaf && (
          <div className="text-center py-3 space-y-3">
            <p className="text-foreground font-medium">{result.uncertainMessage}</p>
            <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              💡 শুধুমাত্র পরিষ্কার পাতার ছবি দিন। পাতা ছাড়া অন্য কিছু আপলোড করলে সঠিক ফলাফল পাওয়া যাবে না।
            </p>
          </div>
        )}

        {/* Confidence bar — show for all except uncertain and not_leaf */}
        {!isUncertain && !isNotLeaf && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">নির্ভুলতা</span>
              <span className="text-2xl font-extrabold text-foreground">{confidence}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isHealthy ? "bg-success" : isPossiblyDiseased ? "bg-warning" : "bg-destructive"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </>
        )}

        {/* Healthy */}
        {isHealthy && (
          <p className="text-foreground font-medium text-center py-2">{HEALTHY_MESSAGE}</p>
        )}

        {/* Uncertain */}
        {isUncertain && (
          <div className="text-center py-3 space-y-2">
            <p className="text-foreground font-medium">{result.uncertainMessage}</p>
            <p className="text-sm text-muted-foreground">💡 টিপস: ভালো আলোতে, কাছ থেকে, শুধু পাতার ছবি তুলুন।</p>
          </div>
        )}

        {/* Possibly Diseased */}
        {isPossiblyDiseased && (
          <div className="space-y-3">
            <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 text-center">
              <p className="text-foreground font-semibold text-sm">
                {result.uncertainMessage}
              </p>
            </div>
          </div>
        )}

        {/* Disease detected */}
        {isDiseased && result.disease && (
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-foreground text-lg">🦠 {result.disease.name_bn}</h3>
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${
                result.disease.severity === 'high' ? "bg-destructive/15 text-destructive" : "bg-warning/20 text-secondary-foreground"
              }`}>
                {result.disease.severity === 'high' ? "তীব্রতা: উচ্চ" : "তীব্রতা: মাঝারি"}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-1">📋 বিস্তারিত বর্ণনা:</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{result.disease.description_bn}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-1">💊 সমাধান:</h4>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{result.disease.solution_bn}</p>
            </div>
          </div>
        )}

        {/* Top-2 predictions */}
        {result.topPredictions && result.topPredictions.length > 0 && (
          <div className="border border-border rounded-lg p-3 space-y-2">
            <h4 className="font-semibold text-foreground text-sm">📊 সম্ভাব্য রোগ:</h4>
            {result.topPredictions.map((pred, idx) => (
              <div key={pred.disease.id} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {idx + 1}. {pred.disease.name_bn}
                </span>
                <span className={`text-sm font-bold ${idx === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                  {Math.round(pred.confidence * 100)}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer for disease */}
        {isDiseased && (
          <p className="text-xs text-muted-foreground text-center italic border-t border-border pt-3">
            ⚠️ এটি একটি প্রাথমিক বিশ্লেষণ। সঠিক রোগ নির্ণয়ের জন্য কৃষি বিশেষজ্ঞের পরামর্শ নিন।
          </p>
        )}

        {/* Audio button — hide for not_leaf */}
        {!isNotLeaf && <Button
          onClick={handleSpeak}
          disabled={speakStatus === 'loading'}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base py-5"
        >
          {speakStatus === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ⏳ অডিও তৈরি হচ্ছে...
            </>
          ) : speakStatus === 'speaking' ? (
            <>
              <VolumeX className="w-5 h-5 mr-2" />
              🔇 থামান
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5 mr-2" />
              🔊 বাংলায় শুনুন
            </>
          )}
        </Button>}
      </div>
    </div>
  );
};

export default ResultCard;
