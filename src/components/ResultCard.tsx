import { useState } from "react";
import { CheckCircle, AlertTriangle, Volume2, Loader2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PredictionResult, HEALTHY_MESSAGE, speakBangla, stopBangla, SpeakStatus } from "@/lib/diseaseData";
import { toast } from "sonner";

interface ResultCardProps {
  result: PredictionResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const isHealthy = result.status === "healthy";
  const confidence = Math.round(result.confidence * 100);
  const [speakStatus, setSpeakStatus] = useState<SpeakStatus>('idle');

  const handleSpeak = () => {
    if (speakStatus === 'speaking') {
      stopBangla();
      setSpeakStatus('idle');
      return;
    }

    const text = isHealthy
      ? HEALTHY_MESSAGE
      : result.disease
        ? `রোগের নাম: ${result.disease.name_bn}। সমস্যা: ${result.disease.description_bn}। সমাধান: ${result.disease.solution_bn}`
        : '';

    if (!text) return;

    speakBangla(text, (status) => {
      setSpeakStatus(status);
    });
  };

  return (
    <div className={`w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-agro border ${
      isHealthy ? "border-success/30 bg-accent" : "border-destructive/30 bg-destructive/5"
    }`}>
      {/* Status header */}
      <div className={`px-5 py-4 flex items-center gap-3 ${
        isHealthy ? "gradient-hero" : "bg-destructive"
      }`}>
        {isHealthy ? (
          <CheckCircle className="w-7 h-7 text-primary-foreground" />
        ) : (
          <AlertTriangle className="w-7 h-7 text-destructive-foreground" />
        )}
        <span className={`font-bold text-lg ${isHealthy ? "text-primary-foreground" : "text-destructive-foreground"}`}>
          {isHealthy ? "সুস্থ পাতা ✅" : "রোগ সনাক্ত হয়েছে ⚠️"}
        </span>
        {confidence < 75 && (
          <span className="text-xs opacity-80 ml-1">(প্রাথমিক বিশ্লেষণ)</span>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Confidence */}
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

        {isHealthy ? (
          <p className="text-foreground font-medium text-center py-2">{HEALTHY_MESSAGE}</p>
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

        {!isHealthy && (
          <p className="text-xs text-muted-foreground text-center italic border-t border-border pt-3">
            ⚠️ এটি একটি প্রাথমিক বিশ্লেষণ। সঠিক রোগ নির্ণয়ের জন্য কৃষি বিশেষজ্ঞের পরামর্শ নিন।
          </p>
        )}

        {/* Audio button */}
        <Button
          onClick={handleSpeak}
          disabled={speakStatus === 'speaking' && false}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base py-5"
        >
          {speakStatus === 'speaking' ? (
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
