import { useState } from "react";
import { CheckCircle, AlertTriangle, HelpCircle, Volume2, VolumeX, Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PredictionResult, HEALTHY_MESSAGE, speakBangla, stopBangla, SpeakStatus } from "@/lib/diseaseData";
import { toast } from "sonner";

interface ResultCardProps {
  result: PredictionResult;
  compact?: boolean;
}

const ResultCard = ({ result, compact }: ResultCardProps) => {
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

  const iconSize = compact ? "w-5 h-5" : "w-6 h-6";
  const getHeaderIcon = () => {
    if (isHealthy) return <CheckCircle className={`${iconSize} text-primary-foreground`} />;
    if (isNotLeaf) return <AlertTriangle className={`${iconSize} text-destructive-foreground`} />;
    if (isPossiblyDiseased) return <ShieldAlert className={`${iconSize} text-primary-foreground`} />;
    if (isUncertain) return <HelpCircle className={`${iconSize} text-foreground`} />;
    return <AlertTriangle className={`${iconSize} text-destructive-foreground`} />;
  };

  const getHeaderText = () => {
    if (isHealthy) return `সুস্থ পাতা (${confidence}% নিশ্চিত) ✅`;
    if (isNotLeaf) return "❌ পাতা সনাক্ত হয়নি";
    if (isPossiblyDiseased) return "সম্ভবত রোগাক্রান্ত ⚠️";
    if (isUncertain) return "ছবি অস্পষ্ট 🔄";
    return "রোগ সনাক্ত হয়েছে ⚠️";
  };

  const p = compact ? "p-2" : "p-5";
  const sp = compact ? "space-y-1.5" : "space-y-4";
  const hp = compact ? "px-3 py-1.5" : "px-5 py-4";

  return (
    <div className={`w-full ${compact ? "" : "max-w-md"} mx-auto rounded-xl overflow-hidden shadow-agro border ${getBorderStyle()} flex flex-col`}>
      {/* Status header */}
      <div className={`${hp} flex items-center gap-3 ${getHeaderStyle()}`}>
        {getHeaderIcon()}
        <span className={`font-bold ${compact ? "text-base" : "text-lg"} ${isUncertain ? "text-foreground" : "text-primary-foreground"}`}>
          {getHeaderText()}
        </span>
      </div>

      <div className={`${p} ${sp} flex-1`}>
        {/* Not a leaf */}
        {isNotLeaf && (
          <div className="text-center py-2 space-y-2">
            <p className="text-foreground font-medium text-sm">{result.uncertainMessage}</p>
            <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
              💡 শুধুমাত্র পরিষ্কার পাতার ছবি দিন।
            </p>
          </div>
        )}

        {/* Confidence bar */}
        {!isUncertain && !isNotLeaf && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">নির্ভুলতা</span>
              <span className={`${compact ? "text-lg" : "text-2xl"} font-extrabold text-foreground`}>{confidence}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
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
          <p className="text-foreground font-medium text-center text-sm py-1">{HEALTHY_MESSAGE}</p>
        )}

        {/* Uncertain */}
        {isUncertain && (
          <div className="text-center py-2 space-y-1">
            <p className="text-foreground font-medium text-sm">{result.uncertainMessage}</p>
            <p className="text-xs text-muted-foreground">💡 ভালো আলোতে, কাছ থেকে, শুধু পাতার ছবি তুলুন।</p>
          </div>
        )}

        {/* Possibly Diseased */}
        {isPossiblyDiseased && (
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-2 text-center">
            <p className="text-foreground font-semibold text-xs">{result.uncertainMessage}</p>
          </div>
        )}

        {/* Disease detected */}
        {isDiseased && result.disease && (
          <div className={compact ? "space-y-1" : "space-y-2"}>
            <div>
              <h3 className={`font-bold text-foreground ${compact ? "text-sm" : "text-base"}`}>🦠 {result.disease.name_bn}</h3>
              <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${
                result.disease.severity === 'high' ? "bg-destructive/15 text-destructive" : "bg-warning/20 text-secondary-foreground"
              }`}>
                {result.disease.severity === 'high' ? "তীব্রতা: উচ্চ" : "তীব্রতা: মাঝারি"}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-xs mb-1">📋 বিস্তারিত:</h4>
              <p className={`text-muted-foreground text-xs ${compact ? "leading-snug" : "leading-relaxed"}`}>{result.disease.description_bn}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-xs mb-0.5">💊 সমাধান:</h4>
              <p className={`text-muted-foreground text-xs whitespace-pre-line ${compact ? "leading-snug" : "leading-relaxed"}`}>{result.disease.solution_bn}</p>
            </div>
          </div>
        )}

        {/* Top-2 predictions */}
        {result.topPredictions && result.topPredictions.length > 0 && (
          <div className={`border border-border rounded-lg ${compact ? "p-1.5" : "p-2"} space-y-1`}>
            <h4 className="font-semibold text-foreground text-xs">📊 সম্ভাব্য রোগ:</h4>
            {result.topPredictions.map((pred, idx) => (
              <div key={pred.disease.id} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{idx + 1}. {pred.disease.name_bn}</span>
                <span className={`text-xs font-bold ${idx === 0 ? "text-foreground" : "text-muted-foreground"}`}>
                  {Math.round(pred.confidence * 100)}%
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        {isDiseased && (
          <p className="text-xs text-muted-foreground text-center italic border-t border-border pt-2">
            ⚠️ প্রাথমিক বিশ্লেষণ। কৃষি বিশেষজ্ঞের পরামর্শ নিন।
          </p>
        )}

        {/* Audio button */}
        {!isNotLeaf && (
          <Button
            onClick={handleSpeak}
            disabled={speakStatus === 'loading'}
            className={`w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm ${compact ? "py-2" : "py-5"}`}
          >
            {speakStatus === 'loading' ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> ⏳ অডিও তৈরি হচ্ছে...</>
            ) : speakStatus === 'speaking' ? (
              <><VolumeX className="w-4 h-4 mr-2" /> 🔇 থামান</>
            ) : (
              <><Volume2 className="w-4 h-4 mr-2" /> 🔊 বাংলায় শুনুন</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
