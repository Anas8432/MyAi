import React, { useContext, useState } from "react"
import { FaMessage, FaPlus, FaQuestion } from "react-icons/fa6"
import { MdHistory } from "react-icons/md"
import { IoClose, IoSettings } from "react-icons/io5"
import { Context } from "../context/Context"

const Sidebar = ({ open, setOpen }) => {
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context)

  const loadPrompt = async (prompt) => {
    if (!prompt) return

    setRecentPrompt(prompt)
    await onSent(prompt)

    if (window.innerWidth < 768) {
      setOpen(false)
    }
  }



  const sidebarLinks = [
    {
      icon: <FaQuestion className="text-2xl" />,
      label: "Help",
    },
    {
      icon: <MdHistory className="text-2xl" />,
      label: "Activity",
    },
    {
      icon: <IoSettings className="text-2xl" />,
      label: "Settings",
    },
  ]


  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div className={`fixed md:sticky top-0 left-0 z-50 text-white inline-flex flex-col justify-between bg-[#000000] py-[25px] px-[15px] transform transition-all duration-300 ease-in-out w-64 shadow shadow-slate-700 h-[100vh]
     ${open ? "translate-x-0" : "-translate-x-full"}
     md:translate-x-0
     md:static
     `}>
        <div>
          <div className="md:hidden flex justify-end mt-[-3px]">
            <IoClose
              onClick={() => setOpen(false)}
              className="text-2xl cursor-pointer"
            />
          </div>

          <div
            onClick={() => newChat()}
            className="mt-3 inline-flex items-center gap-3 py-3 px-4 text-sm text-white cursor-pointer bg-slate-800 hover:bg-slate-700 transition rounded-full"
          >
            <FaPlus className="text-2xl" />

            <p>New Chat</p>
          </div>

          {(
            <div className="flex flex-col animate-fadeIn duration-1000">
              <p className="mt-7 mb-5">Recent</p>
              <div className="h-[40vh] overflow-y-auto scrollbar-hidden pr-1">
                {prevPrompt?.map((item, index) => {
                  return (
                    <div
                      onClick={() => loadPrompt(item)}
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-full text-slate-200 cursor-pointer hover:bg-slate-800 transition"
                    >
                      <FaMessage className="text-2xl" />
                      <p>
                        {item.length > 18 ? `${item.slice(0, 18)}...` : item}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {sidebarLinks.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-full text-slate-100 cursor-pointer hover:bg-slate-800 transition"
            >
              {item.icon}
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar