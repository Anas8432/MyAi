import React from "react"
import Sidebar from "./components/Sidebar"
import MainContent from "./components/MainContent"
import { useState } from "react"

const App = () => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex animate-fadeIn duration-1000">
        <Sidebar 
        open={open}
        setOpen={setOpen}
        />
        <MainContent 
        open={open}
        setOpen={setOpen}
        />
      </div>
    </>
  )
}

export default App
