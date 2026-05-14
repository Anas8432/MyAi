/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  throw new Error("Gemini API key is missing")
}

const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
})

const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
}

async function run(prompt) {

  if (!prompt.trim()) {
    return "Please enter a prompt."
  }

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  })

  try {

    const startTime = Date.now()

    const result = await chatSession.sendMessage(prompt)

    const response = await result.response.text()

    const elapsedTime = Date.now() - startTime

    const minimumLoadingTime = 1500


    if (elapsedTime < minimumLoadingTime) {
      await new Promise((resolve) =>
        setTimeout(resolve, minimumLoadingTime - elapsedTime)
      )
    }

    return response

  } catch (error) {
    console.error("Gemini Error:", error)
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))

    await delay(1500)

    return "Something went wrong. Please try again."
  }
}

export default run