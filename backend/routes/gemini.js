const express = require('express');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const Response = require('../models/Response');
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/gemini', async(req, res) => {
    const {surah, startAyat, endAyat} = req.body;

    const prompt = `Provide a detailed explanation in Bengali for Surah ${surah}, Ayat ${startAyat}-${endAyat}.
  Include:
  1.Relevant other surahs ayat with explanation
  2. Simple Bengali translation
  3. Tafsir (explanation) 
  4. Relevant Hadith with reference
  5. Practical life lessons for recent time context and Prophet(PBUH) context

  `;

  try{
     const model = genAI.getGenerativeModel({model:'gemini-1.5-flash-latest'});
     const result = await model.generateContent(prompt);
     const response = await result.response;
     const text = response.text();
     const newResponse = new Response({
        prompt : `Surah ${surah}, Ayat ${startAyat}-${endAyat}`,
        response: text,
     })
     await newResponse.save();

     res.json({ response: text});
  }catch(error){
        console.error("Full Error:", error);  // Log complete error
  res.status(500).json({ 
    error: "Failed to generate response",
    details: error.message  // Forward error details
  });
  }
})
module.exports = router