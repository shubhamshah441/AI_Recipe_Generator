const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config({ path: "../.env" }); // Adjusted to load from parent directory

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse query parameters
app.use(express.urlencoded({ extended: true }));

// SSE Endpoint
app.get("/recipeStream", (req, res) => {
  const { ingredients, cuisine, cookingTime, complexity, people, note, type } = req.query;

  // Validate required query parameters
  if (!ingredients || !cuisine || !cookingTime || !complexity || !people) {
    return res.status(400).json({ error: "Missing required query parameters." });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send messages
  const sendEvent = (chunk) => {
    if (chunk.choices[0].finish_reason === "stop") {
      res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
      res.end(); // Close the connection when done
    } else {
      res.write(`data: ${JSON.stringify({ action: "chunk", chunk: chunk.choices[0].delta.content })}\n\n`);
    }
  };

  // Include the note if provided by the user
  const customNote = note ? `Please ensure the recipe meets the following requirement: ${note}.` : "";

  // Determine the prompt based on the type (regular or dessert)
  let prompt;
  if (type === "dessert") {
    prompt = `
      Generate a dessert recipe in a structured plain text format with a suitable name for the dessert based on the given ingredients, cuisine, and other details. The dessert name should be in the native language of the cuisine (use correct characters, not transliteration), followed by its English translation in parentheses. The output should be formatted in a visually appealing way, with specific sections in bold as described below.

      ${customNote}

      ---
      **How to Make [Native Dessert Name in Original Script] ([English Translation]) - ${cuisine} Style**

      This dessert recipe is for ${people} servings and takes around ${cookingTime}. Complexity: ${complexity}.

      **Recipe at a Glance:**
      - Cooking Time: ${cookingTime}
      - Complexity: ${complexity}
      - Serves: ${people}
      - Main Ingredients: ${ingredients}

      **Ingredients You’ll Need:**
      - List each ingredient in a clear format, specifying quantities where possible.

      **Step-by-Step Instructions:**
      1. Provide each cooking step in a numbered format.
      2. Include specific steps for preparing the primary ingredient (${ingredients.split(",")[0]}).

      **Nutritional Summary (per serving):**
      - Calories: [calories in kcal]
      - Carbohydrates: [amount in grams]
      - Proteins: [amount in grams]
      - Fats: [amount in grams]

      **Tips for a Perfect Dessert:**
      - Include helpful tips, such as optimal flavor combinations or presentation techniques.

      ---
      The response should use bold headings as specified and be in plain text format. Avoid any markdown syntax or code blocks.
    `;
  } else {
    prompt = `
      Generate a recipe in a structured plain text format with a suitable name for the dish based on the given ingredients, cuisine, and other details. The dish name should be in the native language of the cuisine (use correct characters, not transliteration), followed by its English translation in parentheses. The output should be formatted in a visually appealing way, with specific sections in bold as described below.

      ${customNote}

      ---
      **How to Make [Native Dish Name in Original Script] ([English Translation]) - ${cuisine} Style**

      This recipe is for ${people} servings and takes around ${cookingTime}. Complexity: ${complexity}.

      **Recipe at a Glance:**
      - Cooking Time: ${cookingTime}
      - Complexity: ${complexity}
      - Serves: ${people}
      - Main Ingredients: ${ingredients}

      **Ingredients You’ll Need:**
      - List each ingredient in a clear format, specifying quantities where possible.

      **Step-by-Step Instructions:**
      1. Provide each cooking step in a numbered format.
      2. Include specific steps for cooking the primary ingredient (${ingredients.split(",")[0]}).

      **Nutritional Summary (per serving):**
      - Calories: [calories in kcal]
      - Carbohydrates: [amount in grams]
      - Proteins: [amount in grams]
      - Fats: [amount in grams]

      **Tips for a Perfect Dish:**
      - Include helpful cooking tips, such as optimal flavor combinations or cooking techniques.

      ---
      The response should use bold headings as specified and be in plain text format. Avoid any markdown syntax or code blocks.
    `;
  }

  const messages = [
    { role: "system", content: "You are a recipe assistant that provides structured recipes in plain text format with bold headings, including a nutritional summary per serving." },
    { role: "user", content: prompt },
  ];

  fetchOpenAICompletionsStream(messages, sendEvent);

  req.on("close", () => res.end()); // Handle client disconnection
});

async function fetchOpenAICompletionsStream(messages, callback) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: messages,
      temperature: 1,
      stream: true,
    });

    for await (const chunk of completion) {
      callback(chunk);
    }
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
  }
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));