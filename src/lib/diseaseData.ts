export interface DiseaseInfo {
  id: string;
  name_bn: string;
  name_en: string;
  description_bn: string;
  solution_bn: string;
  severity: 'low' | 'medium' | 'high';
}

export interface TopPrediction {
  disease: DiseaseInfo;
  confidence: number;
}

export interface PredictionResult {
  status: 'healthy' | 'disease' | 'uncertain' | 'possibly_diseased' | 'not_leaf';
  disease?: DiseaseInfo;
  confidence: number;
  uncertainMessage?: string;
  topPredictions?: TopPrediction[];
  blurScore?: number;
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
  overallHealth: number;
}

function calculateBlurScore(data: Uint8ClampedArray, width: number, height: number): number {
  // Laplacian variance on grayscale — low value = blurry
  const gray = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    gray[i] = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
  }

  let sum = 0;
  let sumSq = 0;
  let count = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const lap =
        -4 * gray[y * width + x] +
        gray[(y - 1) * width + x] +
        gray[(y + 1) * width + x] +
        gray[y * width + (x - 1)] +
        gray[y * width + (x + 1)];
      sum += lap;
      sumSq += lap * lap;
      count++;
    }
  }

  const mean = sum / count;
  const variance = sumSq / count - mean * mean;
  return variance;
}

function detectLeaf(features: ImageFeatures, imageData: ImageData): number {
  const data = imageData.data;
  const totalPixels = data.length / 4;

  // 1. Plant-like color presence (green + yellow-brown)
  const plantColorRatio = features.greenRatio + features.yellowBrownRatio;

  // Hard reject: no plant colors at all
  if (features.greenRatio < 0.08 && features.yellowBrownRatio < 0.05) {
    return 0.15;
  }

  // 2. Saturation check — leaves have natural saturation, artificial objects are often gray
  let saturatedCount = 0;
  let blueRedDominant = 0;
  for (let i = 0; i < data.length; i += 16) { // sample every 4th pixel for speed
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    if (saturation > 0.2) saturatedCount++;
    // Count blue/red dominant pixels (non-plant)
    if (b > r * 1.2 && b > g * 1.2 && b > 80) blueRedDominant++;
    if (r > g * 1.4 && r > b * 1.4 && r > 100 && g < 80) blueRedDominant++;
  }
  const sampledPixels = Math.floor(totalPixels / 4);
  const saturationRatio = saturatedCount / Math.max(sampledPixels, 1);
  const blueRedRatio = blueRedDominant / Math.max(sampledPixels, 1);

  // High blue/red dominance = not a leaf
  if (blueRedRatio > 0.4) {
    return 0.2;
  }

  // 3. Compute leaf confidence score
  let score = 0;

  // Green presence is the strongest signal (0-0.4)
  score += Math.min(features.greenRatio * 1.0, 0.4);

  // Plant color presence bonus (0-0.25)
  score += Math.min(plantColorRatio * 0.5, 0.25);

  // Saturation indicates natural colors (0-0.2)
  score += Math.min(saturationRatio * 0.25, 0.2);

  // Penalize heavy blue/red
  score -= blueRedRatio * 0.3;

  // Penalize very low color diversity (uniform objects)
  if (features.greenRatio > 0 && features.yellowBrownRatio === 0 && features.darkSpotRatio === 0) {
    score -= 0.1; // too uniform, suspicious
  }

  // Bonus for having both green + brown (typical of real leaves)
  if (features.greenRatio > 0.1 && features.yellowBrownRatio > 0.02) {
    score += 0.15;
  }

  return Math.max(0, Math.min(1, score));
}

function analyzeImagePixels(imageData: ImageData): ImageFeatures {
  const data = imageData.data;
  const totalPixels = data.length / 4;

  let greenCount = 0;
  let yellowBrownCount = 0;
  let whiteCount = 0;
  let darkSpotCount = 0;
  let bgCount = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r > 240 && g > 240 && b > 240) { bgCount++; continue; }
    if (r < 15 && g < 15 && b < 15) { bgCount++; continue; }

    if (g > r * 1.1 && g > b * 1.1 && g > 50) {
      greenCount++;
    } else if (r > 100 && g > 60 && g < r * 0.95 && b < r * 0.5) {
      yellowBrownCount++;
    } else if (r > 200 && g > 200 && b > 200 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30) {
      whiteCount++;
    } else if (r < 80 && g < 80 && b < 60) {
      darkSpotCount++;
    }
  }

  const foregroundPixels = Math.max(totalPixels - bgCount, 1);
  const greenRatio = greenCount / foregroundPixels;
  const yellowBrownRatio = yellowBrownCount / foregroundPixels;
  const whiteRatio = whiteCount / foregroundPixels;
  const darkSpotRatio = darkSpotCount / foregroundPixels;
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
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));
      ctx.drawImage(img, 0, 0, 224, 224);
      resolve(ctx.getImageData(0, 0, 224, 224));
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = imageDataUrl;
  });
}

function computeTopPredictions(
  features: ImageFeatures,
  selectedCrop?: string
): TopPrediction[] {
  const rawScores: { id: string; score: number }[] = [
    { id: "leaf_blight", score: features.yellowBrownRatio > 0.04 ? features.yellowBrownRatio * 2.5 : 0 },
    { id: "bacterial_spot", score: features.darkSpotRatio > 0.03 ? features.darkSpotRatio * 3.0 : 0 },
    { id: "powdery_mildew", score: features.whiteRatio > 0.04 ? features.whiteRatio * 2.0 : 0 },
    { id: "rust", score: (features.yellowBrownRatio > 0.03 && features.greenRatio > 0.2) ? features.yellowBrownRatio * 2.0 : 0 },
  ];

  // Crop-aware boost
  if (selectedCrop && cropDiseaseMap[selectedCrop]) {
    const relevant = cropDiseaseMap[selectedCrop];
    rawScores.forEach(s => {
      if (relevant.includes(s.id) && s.score > 0) s.score *= 1.3;
    });
  }

  const totalScore = rawScores.reduce((sum, s) => sum + s.score, 0);
  if (totalScore === 0) return [];

  const predictions: TopPrediction[] = rawScores
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(s => ({
      disease: diseases.find(d => d.id === s.id)!,
      confidence: Math.round((s.score / totalScore) * 100) / 100,
    }));

  return predictions;
}

export async function simulatePrediction(imageDataUrl: string, selectedCrop?: string): Promise<PredictionResult> {
  await new Promise(r => setTimeout(r, 800 + Math.random() * 700));

  const imgData = await loadImageToCanvas(imageDataUrl);
  const features = analyzeImagePixels(imgData);

  // Blur detection
  const blurScore = calculateBlurScore(imgData.data, 224, 224);
  const BLUR_THRESHOLD = 50;
  if (blurScore < BLUR_THRESHOLD) {
    return {
      status: 'uncertain',
      confidence: 0.25,
      blurScore,
      uncertainMessage: "ছবি ঝাপসা। অনুগ্রহ করে ভালো আলোতে পরিষ্কার ছবি তুলে আবার চেষ্টা করুন।",
    };
  }

  // Leaf detection gate
  const leafConfidence = detectLeaf(features, imgData);
  if (leafConfidence < 0.70) {
    return {
      status: 'not_leaf',
      confidence: leafConfidence,
      blurScore,
      uncertainMessage: "❌ এটি একটি পাতা নয়। অনুগ্রহ করে একটি পাতার ছবি আপলোড করুন।",
    };
  }

  const totalPixels = imgData.data.length / 4;
  const fgPixels = totalPixels * (features.greenRatio + features.yellowBrownRatio + features.whiteRatio + features.darkSpotRatio);
  const foregroundRatio = fgPixels / totalPixels;

  if (foregroundRatio < 0.15 || features.greenRatio < 0.05) {
    return {
      status: 'uncertain',
      confidence: 0.3,
      blurScore,
      uncertainMessage: "ছবিতে পাতা স্পষ্টভাবে দেখা যাচ্ছে না। অনুগ্রহ করে একটি পরিষ্কার পাতার ছবি তুলুন।",
    };
  }

  const totalDiseaseSignal = features.yellowBrownRatio + features.whiteRatio + features.darkSpotRatio;
  const topPredictions = computeTopPredictions(features, selectedCrop);

  // Healthy: good green presence, low disease signal
  if (features.greenRatio >= 0.35 && totalDiseaseSignal < 0.08) {
    let confidence = 0.80 + features.greenRatio * 0.15;
    // Green-dominance boost for very green leaves
    if (features.greenRatio >= 0.60) {
      confidence = Math.max(confidence, 0.90);
    }
    return {
      status: 'healthy',
      confidence: Math.min(confidence, 0.98),
      blurScore,
      topPredictions: topPredictions.length > 0 ? topPredictions : undefined,
    };
  }

  // Possibly diseased: moderate green, not confident enough for healthy
  if (features.greenRatio >= 0.20 && features.greenRatio < 0.35 && totalDiseaseSignal < 0.10) {
    const confidence = 0.60 + features.greenRatio * 0.15;
    return {
      status: 'possibly_diseased',
      confidence: Math.min(confidence, 0.79),
      blurScore,
      topPredictions: topPredictions.length > 0 ? topPredictions : undefined,
      uncertainMessage: "⚠️ ফলাফল নিশ্চিত নয়, আবার চেষ্টা করুন। পাতার আক্রান্ত অংশের কাছ থেকে ছবি তুলুন।",
    };
  }

  // Minimum disease signal threshold
  if (totalDiseaseSignal < 0.06) {
    return {
      status: 'uncertain',
      confidence: 0.4,
      blurScore,
      uncertainMessage: "ছবি থেকে রোগ নিশ্চিতভাবে সনাক্ত করা যাচ্ছে না। ভালো আলোতে কাছ থেকে পাতার ছবি তুলে আবার চেষ্টা করুন।",
    };
  }

  // Disease detected — use top prediction
  if (topPredictions.length === 0) {
    return {
      status: 'uncertain',
      confidence: 0.35,
      blurScore,
      uncertainMessage: "রোগের ধরন নির্ধারণ করা যাচ্ছে না। পাতার আক্রান্ত অংশের কাছ থেকে ছবি তুলুন।",
    };
  }

  const bestDisease = topPredictions[0].disease;
  const confidence = 0.60 + Math.min(totalDiseaseSignal * 2, 0.35);

  return {
    status: 'disease',
    disease: bestDisease,
    confidence: Math.min(confidence, 0.95),
    blurScore,
    topPredictions,
  };
}

export type SpeakStatus = 'idle' | 'loading' | 'speaking' | 'error';
type StatusCallback = (status: SpeakStatus) => void;

let currentAudio: HTMLAudioElement | null = null;
let currentObjectUrl: string | null = null;

export function stopBangla() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }
}

export async function speakBangla(text: string, onStatus?: StatusCallback) {
  stopBangla();
  onStatus?.('loading');

  // Create Audio element SYNCHRONOUSLY in user gesture context
  const audio = new Audio();
  currentAudio = audio;

  audio.onplay = () => onStatus?.('speaking');
  audio.onended = () => {
    stopBangla();
    onStatus?.('idle');
  };
  audio.onerror = () => {
    stopBangla();
    onStatus?.('error');
  };

  try {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const apiKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    const url = `https://${projectId}.supabase.co/functions/v1/tts`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'apikey': apiKey,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      console.error('TTS failed:', response.status);
      onStatus?.('error');
      return;
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    currentObjectUrl = objectUrl;

    // Set src and play — works on mobile because Audio was created in gesture context
    audio.src = objectUrl;
    await audio.play();
  } catch (err) {
    console.error('TTS error:', err);
    stopBangla();
    onStatus?.('error');
  }
}
