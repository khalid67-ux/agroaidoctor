export interface DiseaseInfo {
  id: string;
  name_bn: string;
  name_en: string;
  description_bn: string;
  solution_bn: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PredictionResult {
  status: 'healthy' | 'disease' | 'uncertain';
  disease?: DiseaseInfo;
  confidence: number;
  uncertainMessage?: string;
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

// Crop-disease relevance mapping
const cropDiseaseMap: Record<string, string[]> = {
  rice: ["leaf_blight", "rust", "bacterial_spot"],
  potato: ["leaf_blight", "bacterial_spot", "powdery_mildew"],
  tomato: ["bacterial_spot", "leaf_blight", "powdery_mildew"],
  wheat: ["rust", "powdery_mildew", "leaf_blight"],
};

interface ImageFeatures {
  greenRatio: number;
  yellowBrownRatio: number;
  whiteRatio: number;
  darkSpotRatio: number;
  overallHealth: number; // 0-1, higher = healthier
}

function analyzeImagePixels(imageData: ImageData): ImageFeatures {
  const data = imageData.data;
  const totalPixels = data.length / 4;

  let greenCount = 0;
  let yellowBrownCount = 0;
  let whiteCount = 0;
  let darkSpotCount = 0;
  let bgCount = 0; // background pixels to exclude

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Skip very bright white/near-white background
    if (r > 240 && g > 240 && b > 240) {
      bgCount++;
      continue;
    }
    // Skip very dark background
    if (r < 15 && g < 15 && b < 15) {
      bgCount++;
      continue;
    }

    // Green dominant: healthy leaf tissue
    if (g > r * 1.1 && g > b * 1.1 && g > 50) {
      greenCount++;
    }
    // Yellow/brown: blight, rust indicators
    else if (r > 100 && g > 60 && g < r * 0.95 && b < r * 0.5) {
      yellowBrownCount++;
    }
    // White/light patches: powdery mildew
    else if (r > 200 && g > 200 && b > 200 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30) {
      whiteCount++;
    }
    // Dark spots: bacterial spot
    else if (r < 80 && g < 80 && b < 60) {
      darkSpotCount++;
    }
  }

  const foregroundPixels = Math.max(totalPixels - bgCount, 1);

  const greenRatio = greenCount / foregroundPixels;
  const yellowBrownRatio = yellowBrownCount / foregroundPixels;
  const whiteRatio = whiteCount / foregroundPixels;
  const darkSpotRatio = darkSpotCount / foregroundPixels;

  // Overall health: high green ratio with low disease indicators = healthy
  const diseaseSignal = yellowBrownRatio * 2 + whiteRatio * 1.5 + darkSpotRatio * 2.5;
  const overallHealth = Math.max(0, Math.min(1, greenRatio - diseaseSignal));

  return { greenRatio, yellowBrownRatio, whiteRatio, darkSpotRatio, overallHealth };
}

function loadImageToCanvas(imageDataUrl: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Resize for performance (max 200px)
      const scale = Math.min(200 / img.width, 200 / img.height, 1);
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = imageDataUrl;
  });
}

export async function simulatePrediction(imageDataUrl: string, selectedCrop?: string): Promise<PredictionResult> {
  await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

  const imgData = await loadImageToCanvas(imageDataUrl);
  const features = analyzeImagePixels(imgData);

  const totalPixels = imgData.data.length / 4;
  const bgPixels = totalPixels - (features.greenRatio + features.yellowBrownRatio + features.whiteRatio + features.darkSpotRatio) * totalPixels;
  const foregroundRatio = 1 - (bgPixels / totalPixels);

  // If very little foreground content, image is likely not a clear leaf photo
  if (foregroundRatio < 0.15 || features.greenRatio < 0.05) {
    return {
      status: 'uncertain',
      confidence: 0.3,
      uncertainMessage: "ছবিতে পাতা স্পষ্টভাবে দেখা যাচ্ছে না। অনুগ্রহ করে একটি পরিষ্কার পাতার ছবি তুলুন।",
    };
  }

  const totalDiseaseSignal = features.yellowBrownRatio + features.whiteRatio + features.darkSpotRatio;

  // Healthy: strong green, weak disease signals
  if (features.greenRatio > 0.3 && totalDiseaseSignal < 0.1) {
    const confidence = 0.75 + features.greenRatio * 0.2;
    return {
      status: 'healthy',
      confidence: Math.min(confidence, 0.98),
    };
  }

  // Also healthy if green dominates disease signals by a large margin
  if (features.greenRatio > totalDiseaseSignal * 3 && totalDiseaseSignal < 0.15) {
    const confidence = 0.70 + features.greenRatio * 0.15;
    return {
      status: 'healthy',
      confidence: Math.min(confidence, 0.95),
    };
  }

  // Minimum disease signal threshold — below this, result is uncertain
  const minDiseaseThreshold = 0.06;
  if (totalDiseaseSignal < minDiseaseThreshold) {
    return {
      status: 'uncertain',
      confidence: 0.4,
      uncertainMessage: "ছবি থেকে রোগ নিশ্চিতভাবে সনাক্ত করা যাচ্ছে না। ভালো আলোতে কাছ থেকে পাতার ছবি তুলে আবার চেষ্টা করুন।",
    };
  }

  // Determine disease by strongest signal — no default fallback
  const diseaseScores: { id: string; score: number }[] = [
    { id: "leaf_blight", score: features.yellowBrownRatio > 0.08 ? features.yellowBrownRatio : 0 },
    { id: "bacterial_spot", score: features.darkSpotRatio > 0.05 ? features.darkSpotRatio : 0 },
    { id: "powdery_mildew", score: features.whiteRatio > 0.06 ? features.whiteRatio : 0 },
    { id: "rust", score: (features.yellowBrownRatio > 0.05 && features.greenRatio > 0.25) ? features.yellowBrownRatio * 0.9 : 0 },
  ];

  // Sort by score descending
  diseaseScores.sort((a, b) => b.score - a.score);

  // If best score is still 0, uncertain
  if (diseaseScores[0].score === 0) {
    return {
      status: 'uncertain',
      confidence: 0.35,
      uncertainMessage: "রোগের ধরন নির্ধারণ করা যাচ্ছে না। পাতার আক্রান্ত অংশের কাছ থেকে ছবি তুলুন।",
    };
  }

  let bestDiseaseId = diseaseScores[0].id;

  // Crop-aware: only prioritize if that disease also has a nonzero score
  if (selectedCrop && cropDiseaseMap[selectedCrop]) {
    const relevantDiseases = cropDiseaseMap[selectedCrop];
    if (!relevantDiseases.includes(bestDiseaseId)) {
      const cropMatch = diseaseScores.find(d => d.score > 0 && relevantDiseases.includes(d.id));
      if (cropMatch) bestDiseaseId = cropMatch.id;
      // If no crop-relevant disease has signal, keep the strongest one
    }
  }

  const disease = diseases.find(d => d.id === bestDiseaseId) || diseases[0];
  const confidence = 0.60 + Math.min(totalDiseaseSignal * 2, 0.35);

  return {
    status: 'disease',
    disease,
    confidence: Math.min(confidence, 0.95),
  };
}

function splitTextToChunks(text: string, maxLen = 200): string[] {
  const cleaned = text.replace(/\n/g, '। ').replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLen) return [cleaned];

  const chunks: string[] = [];
  let remaining = cleaned;

  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let splitAt = remaining.lastIndexOf('।', maxLen);
    if (splitAt < 20) splitAt = remaining.lastIndexOf(' ', maxLen);
    if (splitAt < 20) splitAt = maxLen;
    chunks.push(remaining.slice(0, splitAt + 1).trim());
    remaining = remaining.slice(splitAt + 1).trim();
  }

  return chunks.filter(c => c.length > 0);
}
export type SpeakStatus = 'idle' | 'speaking' | 'error';
type StatusCallback = (status: SpeakStatus) => void;

let isSpeaking = false;

export function stopBangla() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  isSpeaking = false;
}

function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    const onVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      clearTimeout(timer);
      resolve(window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    const timer = setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(window.speechSynthesis.getVoices());
    }, 2000);
  });
}

function findBengaliVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  return voices.find(v =>
    v.lang.startsWith('bn') ||
    v.name.toLowerCase().includes('bengali') ||
    v.name.toLowerCase().includes('bangla') ||
    v.name.includes('বাংলা')
  );
}

function speakChunk(text: string, bnVoice?: SpeechSynthesisVoice): Promise<void> {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.85;

    if (bnVoice) {
      utterance.voice = bnVoice;
      utterance.lang = bnVoice.lang;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      if (e.error === 'canceled') resolve();
      else reject(e);
    };
    window.speechSynthesis.speak(utterance);
  });
}

export async function speakBangla(text: string, onStatus?: StatusCallback) {
  stopBangla();

  if (!('speechSynthesis' in window)) {
    onStatus?.('error');
    return;
  }

  isSpeaking = true;
  onStatus?.('speaking');

  const chunks = splitTextToChunks(text);

  try {
    const voices = await waitForVoices();
    const bnVoice = findBengaliVoice(voices);

    for (const chunk of chunks) {
      if (!isSpeaking) return;
      await speakChunk(chunk, bnVoice);
    }
  } catch {
    // speech failed
  }

  isSpeaking = false;
  onStatus?.('idle');
}
