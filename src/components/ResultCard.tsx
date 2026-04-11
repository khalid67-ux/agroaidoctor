import { useState } from "react";
import { CheckCircle, AlertTriangle, HelpCircle, Volume2, VolumeX, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PredictionResult, HEALTHY_MESSAGE, speakBangla, stopBangla, SpeakStatus } from "@/lib/diseaseData";
import { toast } from "sonner";


interface ResultCardProps {
  result: PredictionResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const isHealthy = result.status === "healthy";
  const isUncertain = result.status === "uncertain";
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
    } else if (isUncertain) {
      text = result.uncertainMessage || "ছবি থেকে রোগ সনাক্ত করা যায়নি।";
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

  return (
    <div className={`w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-agro border ${
      isHealthy ? "border-success/30 bg-accent" : isUncertain ? "border-warning/30 bg-warning/5" : "border-destructive/30 bg-destructive/5"
    }`}>
      {/* Status header */}
      <div className={`px-5 py-4 flex items-center gap-3 ${
        isHealthy ? "gradient-hero" : isUncertain ? "bg-warning" : "bg-destructive"
      }`}>
        {isHealthy ? (
          <CheckCircle className="w-7 h-7 text-primary-foreground" />
        ) : isUncertain ? (
          <HelpCircle className="w-7 h-7 text-primary-foreground" />
        ) : (
          <AlertTriangle className="w-7 h-7 text-destructive-foreground" />
        )}
        <span className={`font-bold text-lg text-primary-foreground`}>
          {isHealthy ? "সুস্থ পাতা ✅" : isUncertain ? "ছবি অস্পষ্ট 🔄" : "রোগ সনাক্ত হয়েছে ⚠️"}
        </span>
      </div>

      <div className="p-5 space-y-4">
        {!isUncertain && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">নির্ভুলতা</span>
              <span className="text-2xl font-extrabold text-foreground">{confidence}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${isHealthy ? "bg-success" : "bg-warning"}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </>
        )}

        {isHealthy ? (
          <p className="text-foreground font-medium text-center py-2">{HEALTHY_MESSAGE}</p>
        ) : isUncertain ? (
          <div className="text-center py-3 space-y-2">
            <p className="text-foreground font-medium">{result.uncertainMessage}</p>
            <p className="text-sm text-muted-foreground">💡 টিপস: ভালো আলোতে, কাছ থেকে, শুধু পাতার ছবি তুলুন।</p>
          </div>
        ) : result.disease ? (
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
        ) : null}

        {!isHealthy && !isUncertain && (
          <p className="text-xs text-muted-foreground text-center italic border-t border-border pt-3">
            ⚠️ এটি একটি প্রাথমিক বিশ্লেষণ। সঠিক রোগ নির্ণয়ের জন্য কৃষি বিশেষজ্ঞের পরামর্শ নিন।
          </p>
        )}

        {/* Audio button */}
        <Button
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
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;
