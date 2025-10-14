import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  // Parse JSON body manually
  let body;
  try {
    body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => (data += chunk));
      req.on("end", () => resolve(JSON.parse(data || "{}")));
      req.on("error", err => reject(err));
    });
  } catch {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  const { code, language } = body;
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

    // Optionally add CORS headers if frontend is on a different domain
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ explanation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
