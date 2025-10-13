import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { OpenAI } from "openai";
const app = express();

//security middleware

app.use(helmet());
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })

);

const limiter = rateLimit({
    window
: 15 * 60 * 1000, // 15 minutes
    max: 100,
    mesage : " Too man request from this IP , please try again " 
})
app.use(limiter);

app.use(express.json({ limit : "10mb"}));
const APIKEY = process.env.NEBIUS_API_KEY;

const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: APIKEY,
});



app.post("/api/explain-code", async (req, res) => {
try {
    const { code, language } = req.body;
    if(!code ) {
        return res.status(400).json({error: "Code is required " });
    }


    const messages =[
        {
        role: "user",
        content: `Explain this ${language || ""} code in 2-3 short sentences. Be concise and clear:\n\n\`\`${language || "" }\n ${code}\n\`\`` 
        }
        
    ]
        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages,
            temperature: 0.2,
            max_tokens: 200,


        });

     const explaination =   response?.choices[0]?.message?.content;

        if(!explaination) {
            return res.status(500).json({error: "Failed to get explanation from AI" });
        }   
        res.json({ explaination });

} catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" , details: error.message });
}});

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})