
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateSummary = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash" // fast + free
    });

    const prompt = `
    Summarize the following movie in EXACTLY one short line. 
    Do NOT add introductions, explanations, markdown, quotes, or extra sentences.
    Movie description: ${text}
    `;

    const response = await model.generateContent(prompt);

    return response.response.text().trim();
  } catch (err) {
    console.error("Summary Error:", err.message || err);
    return "Summary unavailable";
  }
}

// embedding using hgimini
exports.generateEmbedding = async (text) => {
    try {
        console.log("Gemini key =", process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

        const result = await model.embedContent(text);

        return result.embedding.values; // array of numbers
    } catch (err) {
        console.error("Embedding Error:", err);
        return [];
    }
};

// function for cosine similarity for recomendation
exports.cosineSimilarity = (a, b) => {
  let dot = 0, normA = 0, normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};
