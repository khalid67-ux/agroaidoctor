import { corsHeaders } from "@supabase/supabase-js/cors";

function splitText(text: string, maxLen = 200): string[] {
  const cleaned = text.replace(/\n/g, "। ").replace(/\s+/g, " ").trim();
  if (cleaned.length <= maxLen) return [cleaned];

  const chunks: string[] = [];
  let remaining = cleaned;

  while (remaining.length > 0) {
    if (remaining.length <= maxLen) {
      chunks.push(remaining);
      break;
    }
    let splitAt = remaining.lastIndexOf("।", maxLen);
    if (splitAt < 20) splitAt = remaining.lastIndexOf(" ", maxLen);
    if (splitAt < 20) splitAt = maxLen;
    chunks.push(remaining.slice(0, splitAt + 1).trim());
    remaining = remaining.slice(splitAt + 1).trim();
  }

  return chunks.filter((c) => c.length > 0);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Invalid or too long text" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const chunks = splitText(text);
    const audioBuffers: Uint8Array[] = [];

    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=bn&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      const resp = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      if (!resp.ok) {
        console.error(`TTS fetch failed for chunk: ${resp.status}`);
        continue;
      }

      const buffer = new Uint8Array(await resp.arrayBuffer());
      audioBuffers.push(buffer);
    }

    if (audioBuffers.length === 0) {
      return new Response(
        JSON.stringify({ error: "Failed to generate audio" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Concatenate all MP3 buffers
    const totalLength = audioBuffers.reduce((sum, b) => sum + b.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of audioBuffers) {
      combined.set(buf, offset);
      offset += buf.length;
    }

    return new Response(combined, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("TTS error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
