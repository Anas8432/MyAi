import { createContext, useState } from "react"
import run from "../config/gemini"

export const Context = createContext()

const ContextProvider = (props) => {
  const [input, setInput] = useState("")
  const [recentPrompt, setRecentPrompt] = useState("")
  const [prevPrompt, setPrevPrompt] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState([])


  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => {

        const updated = [...prev]

        const lastIndex = updated.length - 1

        updated[lastIndex].response += nextWord + " "

        return [...updated]
      })
    }, 75 * index)
  }


  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {

    if (!prompt && !input.trim()) return

    setResultData((prev) => [
      ...prev,
      {
        prompt: "",
        response: "",
      },
    ])
    setLoading(true)
    setShowResult(true)


    const finalPrompt = prompt ?? input

    setPrevPrompt((prev) => [...prev, finalPrompt])

    setRecentPrompt(finalPrompt)

    setResultData((prev) => {

      const updated = [...prev]

      updated[updated.length - 1].prompt = finalPrompt

      return updated
    })

    const response = await run(finalPrompt)



    let responseArray = (response || "").split("**")
    let newResponse = ""

    for (let i = 0; i < responseArray.length; i++) {
      if (i == 0 || i % 2 !== 1) {
        newResponse += responseArray[i]
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>"
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>")

    let newResponseArray = newResponse2.split(" ")

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i]

      delayPara(i, nextWord + " ")
    }

    const totalTime = newResponseArray.length * 75

    await new Promise((res) => setTimeout(res, totalTime))

    setLoading(false)
    setInput("")
  }
  

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
    newChat,
  }

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  )
}

export default ContextProvider