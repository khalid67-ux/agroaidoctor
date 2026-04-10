export interface DiseaseInfo {
  id: string;
  name_bn: string;
  name_en: string;
  description_bn: string;
  solution_bn: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PredictionResult {
  status: 'healthy' | 'disease';
  disease?: DiseaseInfo;
  confidence: number;
}

export const HEALTHY_MESSAGE = "এই পাতা সুস্থ। কোনো রোগ নেই।";

export const diseases: DiseaseInfo[] = [
  {
    id: "leaf_blight",
    name_bn: "পাতা পোড়া রোগ (লিফ ব্লাইট)",
    name_en: "Leaf Blight",
    description_bn: "এই রোগে পাতার কিনারা থেকে বাদামি বা হলুদ রঙের দাগ শুরু হয় এবং ধীরে ধীরে পুরো পাতায় ছড়িয়ে পড়ে। আক্রান্ত পাতা শুকিয়ে যায় এবং ঝরে পড়ে। এটি ব্যাকটেরিয়া বা ছত্রাক দ্বারা হতে পারে। আর্দ্র ও গরম আবহাওয়ায় এই রোগ দ্রুত ছড়ায়।",
    solution_bn: "১. আক্রান্ত পাতা তুলে পুড়িয়ে ফেলুন।\n২. কপার অক্সিক্লোরাইড (৪ গ্রাম/লিটার পানি) স্প্রে করুন।\n৩. ম্যানকোজেব ছত্রাকনাশক ব্যবহার করুন।\n৪. সুষম সার ব্যবহার করুন, বিশেষ করে পটাশ সার।\n৫. ফসলের মাঝে পর্যাপ্ত বায়ু চলাচল নিশ্চিত করুন।",
    severity: 'high',
  },
  {
    id: "rust",
    name_bn: "মরিচা রোগ (রাস্ট)",
    name_en: "Rust",
    description_bn: "পাতার নিচের দিকে কমলা, হলুদ বা বাদামি রঙের ছোট ছোট গুটি দেখা যায়। এই গুটি থেকে গুঁড়ো বের হয় যা হাতে লাগলে মরিচার মতো দেখায়। আক্রান্ত পাতা হলুদ হয়ে ঝরে পড়ে। এটি ছত্রাকজনিত রোগ।",
    solution_bn: "১. প্রোপিকোনাজল (টিল্ট ২৫ ইসি) ০.৫ মিলি/লিটার পানিতে মিশিয়ে স্প্রে করুন।\n২. ট্রাইডিমরফ ছত্রাকনাশক ব্যবহার করুন।\n৩. রোগ প্রতিরোধী জাত ব্যবহার করুন।\n৪. আক্রান্ত পাতা সংগ্রহ করে পুড়িয়ে ফেলুন।\n৫. ফসল কাটার পর জমি পরিষ্কার রাখুন।",
    severity: 'medium',
  },
  {
    id: "powdery_mildew",
    name_bn: "গুঁড়া চিতা রোগ (পাউডারি মিলডিউ)",
    name_en: "Powdery Mildew",
    description_bn: "পাতার উপরে সাদা পাউডারের মতো আবরণ দেখা যায়। প্রথমে ছোট সাদা দাগ হয়, পরে পুরো পাতা ঢেকে যায়। আক্রান্ত পাতা হলুদ হয়ে কুঁকড়ে যায়। শুষ্ক ও উষ্ণ আবহাওয়ায় এই রোগ বেশি হয়। এটি ছত্রাকজনিত রোগ।",
    solution_bn: "১. সালফার ডাস্ট (গন্ধক গুঁড়া) ছিটিয়ে দিন।\n২. কার্বেন্ডাজিম (২ গ্রাম/লিটার পানি) স্প্রে করুন।\n৩. নিম তেল (৫ মিলি/লিটার পানি) স্প্রে করতে পারেন।\n৪. গাছে অতিরিক্ত নাইট্রোজেন সার দেবেন না।\n৫. গাছের মাঝে পর্যাপ্ত ফাঁকা রাখুন।",
    severity: 'medium',
  },
  {
    id: "bacterial_spot",
    name_bn: "ব্যাকটেরিয়াল দাগ রোগ",
    name_en: "Bacterial Spot",
    description_bn: "পাতায় ছোট ছোট কালো বা গাঢ় বাদামি দাগ দেখা যায়। দাগগুলো পানিতে ভেজা অবস্থায় চকচকে দেখায়। ধীরে ধীরে দাগ বড় হয়ে পাতা ঝরে পড়ে। বৃষ্টি ও উচ্চ আর্দ্রতায় রোগ দ্রুত ছড়ায়।",
    solution_bn: "১. কপার হাইড্রোক্সাইড স্প্রে করুন।\n২. স্ট্রেপ্টোমাইসিন সালফেট (১ গ্রাম/লিটার) ব্যবহার করুন।\n৩. রোগমুক্ত বীজ ব্যবহার করুন।\n৪. ফসল ঘোরানো (crop rotation) অনুসরণ করুন।\n৫. সেচের সময় পাতা ভেজানো এড়িয়ে চলুন।",
    severity: 'high',
  },
];

export const crops = [
  { id: "rice", name_bn: "ধান", name_en: "Rice" },
  { id: "potato", name_bn: "আলু", name_en: "Potato" },
  { id: "tomato", name_bn: "টমেটো", name_en: "Tomato" },
  { id: "wheat", name_bn: "গম", name_en: "Wheat" },
];

export function simulatePrediction(imageData: string): Promise<PredictionResult> {
  return new Promise((resolve) => {
    const delay = 1500 + Math.random() * 2000;
    setTimeout(() => {
      // Use image data hash to produce varied but deterministic results
      let hash = 0;
      for (let i = 0; i < Math.min(imageData.length, 500); i++) {
        hash = ((hash << 5) - hash) + imageData.charCodeAt(i);
        hash |= 0;
      }
      // Add timestamp randomness
      hash = Math.abs(hash + Date.now()) % 100;

      if (hash < 20) {
        resolve({ status: 'healthy', confidence: 0.85 + Math.random() * 0.14 });
      } else {
        const diseaseIndex = hash % diseases.length;
        resolve({
          status: 'disease',
          disease: diseases[diseaseIndex],
          confidence: 0.70 + Math.random() * 0.28,
        });
      }
    }, delay);
  });
}

export function speakBangla(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'bn-BD';
  utterance.rate = 0.85;
  // Try to find a Bengali voice
  const voices = window.speechSynthesis.getVoices();
  const bnVoice = voices.find(v => v.lang.startsWith('bn'));
  if (bnVoice) utterance.voice = bnVoice;
  window.speechSynthesis.speak(utterance);
}
