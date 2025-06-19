const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/generate', async (req, res) => {
  const { idea, language, style } = req.body;

  const messages = [
    { role: 'system', content: `Kamu adalah pembuat prompt video AI untuk Veo 3 yang sangat kreatif.` },
    { role: 'user', content: `Buatkan prompt video berdasarkan ide ini: "${idea}" dengan gaya narasi: "${style}" dan gunakan bahasa: "${language}".` }
  ];

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages,
    });
    res.json({ prompt: completion.data.choices[0].message.content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Gagal menghasilkan prompt.' });
  }
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));
