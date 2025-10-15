export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

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

  const apiKey = process.env.NEBIUS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing API key" });

  try {
    const response = await fetch("https://api.studio.nebius.com/v1/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b", 
        prompt: `Explain this ${language || ""} code in simple terms:\n\n${code}`,
        max_output_tokens: 800
      })
    });

    const data = await response.json();

    const explanation = data.output || data.text || "No explanation returned";

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json({ explanation });
    console.log("🧠 Explanation sent:", explanation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}


