const axios = require('axios');

const dotenv= require('dotenv');
dotenv.config();

const askAI = async(req, res) => {
    try{
        // const {prompt} = req.body;
        // console.log(prompt);
        // if(!prompt){
        //     return res.status(400).json({error: "Prompt is required!"});
        // }
        const { messages } = req.body;

        if (!messages || messages.length === 0) {
        return res.status(400).json({ error: "Messages are required!" });
        }

        // Convert messages into Gemini-compatible format
        const contents = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
        }));
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents
            },
            {
                headers:{
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`, 
                },
            }
        );
        res.json(response.data);
    }
    catch(error){
        console.error(error.response?.data || error.message);
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        console.error("Error message:", error.message);

        res.status(500).json({error: "Failed to connect to Gemini API",
            api_key:"process.env.GEMINI_API_KEY",
        });
    }
}
module.exports = askAI;