import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
})

export const generateResponse = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      })
    }

    const result = await model.generateContent(prompt)

    const response = await result.response.text()

    return res.status(200).json({
      success: true,
      response,
    })

  } catch (error) {

    console.log("Gemini Backend Error:", error)

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    })
  }
}