import React, { useContext, useState } from "react"
import { FaMessage, FaPlus, FaQuestion } from "react-icons/fa6"
import { MdHistory } from "react-icons/md"
import { IoClose, IoSettings } from "react-icons/io5"
import { Context } from "../context/Context"

const Sidebar = ({ open, setOpen }) => {
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)

    await onSent(prompt)
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div className={`fixed md:sticky top-0 left-0 z-50 text-white inline-flex flex-col justify-between bg-[#000000] py-[25px] px-[15px] transform transition-transform duration-300 w-64 shadow shadow-slate-700 h-[100vh]
     ${open ? "translate-x-0" : "-translate-x-full"}
     md:translate-x-0
     md:static
     `}>
        <div>
          <div className="md:hidden flex justify-end mt-[-3px]">
            <IoClose onClick={() => setOpen(!open)} className="text-2xl" />
          </div>

          <div
            onClick={() => newChat()}
            className="mt-[10px] inline-flex items-center gap-[10px] py-[10px] px-[15px] text-[14px] text-gray-500 cursor-pointer bg-gray-50 rounded-full"
          >
            <FaPlus className="text-2xl" />

            <p>New Chat</p>
          </div>

          {(
            <div className="flex flex-col animate-fadeIn duration-1000">
              <p className="mt-7 mb-5">Recent</p>
              <div className="h-[60vh] overflow-y-auto">
                {prevPrompt?.map((item, index) => {
                  return (
                    <div
                      onClick={() => loadPrompt(item)}
                      className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-700 cursor-pointer hover:bg-gray-300"
                    >
                      <FaMessage className="text-2xl" />
                      <p>{item.slice(0, 18)}...</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-50 cursor-pointer hover:bg-gray-600">
            <FaQuestion className="text-2xl" />
            <p>Help</p>
          </div>

          <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-50 cursor-pointer hover:bg-gray-600">
            <MdHistory className="text-2xl" />
            <p>Activity</p>
          </div>

          <div className="flex items-center gap-2 p-2 pr-10 rounded-[50px] text-slate-50 cursor-pointer hover:bg-gray-600">
            <IoSettings className="text-2xl" />
            <p>Settings</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
