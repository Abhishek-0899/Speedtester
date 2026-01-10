// app/api/gemini/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.GEMINI_API_KEY; // store your key in .env
    if (!API_KEY) {
      return NextResponse.json({ error: "API key not set" }, { status: 500 });
    }

    // 1️⃣ List all models
    const listRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    if (!listRes.ok) {
      const text = await listRes.text();
      return NextResponse.json(
        { error: "Failed to list models", details: text },
        { status: 500 }
      );
    }

    const modelsData = await listRes.json();

    // Filter models that support generateContent
    const genModels = modelsData.models.filter((m) =>
      m.supportedGenerationMethods?.includes("generateContent")
    );

    // Pick the first available model
    const modelToUse = genModels[0]?.name;
    if (!modelToUse) {
      return NextResponse.json({ error: "No model supports generateContent" });
    }

    // 2️⃣ Optional: generate content with that model
    const prompt = "Write a short JavaScript function that adds two numbers.";
    const genRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!genRes.ok) {
      const text = await genRes.text();
      return NextResponse.json(
        { error: "Failed to generate content", details: text },
        { status: 500 }
      );
    }

    const generatedData = await genRes.json();

    return NextResponse.json({
      availableModels: genModels.map((m) => m.name),
      usedModel: modelToUse,
      prompt,
      generatedContent: generatedData,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}
