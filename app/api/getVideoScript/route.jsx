"use server";
import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("Prompt received:", prompt);

    const result = await chatSession.sendMessage(prompt);

    if (!result || !result.response) {
      throw new Error("Invalid response from AI API");
    }

    const resultText = await result.response.text();
    console.log("Raw AI Response:", resultText);

    let parsedResult;
    try {
      parsedResult = JSON.parse(resultText);
    } catch (error) {
      console.error("Failed to parse JSON:", resultText);
      return NextResponse.json({ error: "Invalid JSON response from AI API" });
    }

    return NextResponse.json({ result: parsedResult });
  } catch (e) {
    console.error("Error in API:", e);
    return NextResponse.json({ error: e.message });
  }
}
