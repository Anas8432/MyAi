import React, { useContext, useState } from "react"
import {
  FaCode,
  FaCompass,
  FaLightbulb,
  FaMicrophone,
  FaUserCircle,
} from "react-icons/fa"

import ReactMarkdown from "react-markdown"

import { IoMenu } from "react-icons/io5"
import { FaPlus } from "react-icons/fa"

import { FaMessage } from "react-icons/fa6"
import { MdAddPhotoAlternate } from "react-icons/md"
import { IoMdSend } from "react-icons/io"
import { Context } from "../context/Context"
import geminiLogo from "../assets/geminiLogo.png"


const MainContent = ({ open, setOpen }) => {


  const cards = [
    {
      text: "Suggest top 10 webseries.",
      icon: <FaCompass className="text-4xl p-1 absolute bottom-2 right-2" />,
    },
    {
      text: "What is loop in Javascript?",
      icon: <FaLightbulb className="text-4xl p-1 absolute bottom-2 right-2" />,
    },
    {
      text: 'Who is known as the "Mother of Dragons"?',
      icon: <FaMessage className="text-4xl p-1 absolute bottom-2 right-2" />,
    },
    {
      text: "Who sits on the Iron Throne at the end of the series?",
      icon: <FaCode className="text-4xl p-1 absolute bottom-2 right-2" />,
    },
  ]


  const {
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
  } = useContext(Context)

  const clearInput = () => {
    setInput("")
  }


  return (
    <div className="flex-1 w-full relative bg-black">

      <div className="flex fixed w-full top-0 left-0 z-40 md:sticky items-center justify-between text-xl p-5 text-white bg-slate-900">

        <div className="flex items-center gap-5">
          <IoMenu
            onClick={() => setOpen(!open)}
            className="text-2xl block cursor-pointer md:hidden"
          />
          <h1 className="font-bold">MyAi</h1>
        </div>

        <FaUserCircle />

      </div>

      <div className="max-w-[900px] mx-auto mb-36">
        {!showResult ? (
          <>
            <div className="my-12 text-[8vw] md:text-[3rem] text-slate-500 font-semibold p-5 mt-40 mb-32 md:mt-28 md:mb-10">
              <p>
                <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Anas.
                </span>
              </p>

              <p className="text-slate-400">How can I help you today?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="h-[100px] md:h-[200px] p-4 bg-slate-900 rounded-lg relative cursor-pointer hover:bg-slate-800 text-slate-300 transition"
                >
                  <p className="text-lg">{card.text}</p>
                  {card.icon}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-0 px-[5%] max-h-[calc(100vh-220px)] overflow-y-scroll scrollbar-hidden">
            <div className="flex flex-col gap-10 text-white">

              {resultData.map((item, index) => (

                <div key={index} className="flex flex-col gap-5">

                  {/* User Prompt */}
                  <div className="flex items-center gap-4">
                    <FaUserCircle className="text-3xl" />

                    <p className="text-lg leading-[1.8] font-medium">
                      {item.prompt}
                    </p>
                  </div>

                  {/* AI Response */}
                  <div className="flex items-start gap-4">

                    <img
                      src={geminiLogo}
                      alt="MyAi Logo"
                      className="w-8 rounded-full"
                    />

                    <div className="text-lg leading-[1.8]">

                      <ReactMarkdown>
                        {item.response}
                      </ReactMarkdown>

                    </div>

                  </div>

                </div>
              ))}

              {/* Loading Animation */}
              {loading && (
                <div className="flex items-start gap-4">

                  <img
                    src={geminiLogo}
                    alt="MyAi Logo"
                    className="w-8 rounded-full"
                  />

                  <div className="w-full flex flex-col gap-2">
                    {[1, 2, 3].map((item) => (
                      <hr
                        key={item}
                        className="rounded-md border-none bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg"
                      />
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

        <div className="fixed bg-black shadow-sm bottom-0 w-[-webkit-fill-available] max-w-[900px] px-5 mx-auto pt-3 pb-1">
          <div className="flex items-center w-full justify-between bg-slate-900 text-slate-100 py-2 px-5 rounded-full">
            <input
              type="text"
              placeholder="Enter a prompt here..."
              className="flex-1 bg-transparent border-none outline-none p-2 text-lg w-[50%]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (window.innerWidth > 768 && e.key === "Enter" && input.trim()) {
                  onSent();
                  clearInput();
                }
              }}
            />

            <div className="flex gap-4 items-center">
              <MdAddPhotoAlternate className="text-2xl cursor-pointer" />
              <FaMicrophone className="text-2xl cursor-pointer" />
              {input.trim() && (
                <IoMdSend
                  onClick={() => {
                    onSent()
                    clearInput()
                  }}
                  className="text-2xl cursor-pointer hover:text-blue-400 transition"
                />
              )}
            </div>
          </div>

          <p className="text-sm my-4 mx-auto text-center font-[500] text-slate-500">
            MyAi may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div >
  )
}

export default MainContent