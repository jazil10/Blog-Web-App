const axios = require('axios');


const chatbotController = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: `I am a chatbot knowledgeable about all games, especially retro games. I can guide players on how to clear any level in any game.\nUser: ${message}\nBot:`,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer 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`
            }
        });

        const botResponse = response.data.choices[0].text.trim();
        res.status(200).json({ message: botResponse });
    } catch (error) {
        console.error('Error from OpenAI:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Error interacting with the chatbot", error: error.message });
    }
};

module.exports = chatbotController