const express = require('express');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const Response = require('../models/Response');
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/gemini', async (req, res) => {
  const { surah, startAyat, endAyat } = req.body;
  let start = parseInt(startAyat); // Ensure these are numbers
  const end = parseInt(endAyat);
  let text = "Details"; // Initialize as string
  
  try {
    // Validate input
    if (!surah || isNaN(start) || isNaN(end) || start > end) {
      return res.status(400).json({ error: "Invalid input parameters" });
    }

    const responses = []; // Store all responses
    
    while (start <= end) {
      const prompt = `Provide a comprehensive explanation in simple Bengali (বাংলা) for Surah ${surah}, Ayat ${start} that is:

1. **Quranic Context**:
   - 2-3 most relevant cross-references from other Quranic verses
   - Clear explanation of why each reference is relevant
   - Include exact verse numbers (Surah:Ayat format)

2. **Hadith Evidence**:
   - 1-2 authentic Hadith that directly relate to this ayat
   - Include complete reference (Book name, Hadith number)
   - Explanation of how it connects to the verse

3. **Tafsir Explanation**:
   - Classical tafsir from Ibn Kathir or other reputable sources
   - Modern scholarly interpretation
   - Breakdown of key words/phrases in Arabic

4. **Practical Application**:
   - 3 actionable lessons for modern Muslims
   - Contemporary examples from daily life
   - Solutions to common misunderstandings

Guidelines
-specifically focus on sector 1,2 & 4
- Always cite sources properly
- Avoid speculative interpretations
- Maintain respectful tone throughout
- it should be very much suitable for being a speech
- Highlight any linguistic nuances in the original Arabic

Format the response with clear section headings in bold.`;

      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = response.text();
        
        responses.push({
          ayat: start,
          response: responseText
        });
        
        // Save each response to database
        const newResponse = new Response({
          prompt: `Surah ${surah}, Ayat ${start}`,
          response: responseText,
        });
        await newResponse.save();
        
      } catch (error) {
        console.error(`Error processing Ayat ${start}:`, error);
        responses.push({
          ayat: start,
          error: `Failed to generate response for Ayat ${start}`
        });
      }
      
      start++;
    }
    
    // Send all responses at once after loop completes
    res.json({ 
      surah,
      startAyat: startAyat,
      endAyat: endAyat,
      responses 
    });
    
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: "Server error processing request",
      details: error.message
    });
  }
});
module.exports = router