
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import OpenAI  from "openai";


const client = new OpenAI({apiKey : process.env.OPENAI_API_KEY});

export default async function handler(req,res){

     if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

   const { code, language } = req.body;
    if (!code) return res.status(400).json({ error: "Code is required" });

     try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: `Explain this ${language || ""} code in simple terms:\n\n${code}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 200,
    });

    const explanation = response?.choices?.[0]?.message?.content;
    res.status(200).json({ explanation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }



}
//security middleware




