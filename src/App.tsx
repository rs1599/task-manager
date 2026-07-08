import { useState } from "react"
import Form from "./components/Form"
import List from "./components/List"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <main className="container">
      <h1>Task Manager</h1>

      <Form />

      <List />
    </main>

    </>
  )
}

export default App
