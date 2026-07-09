import { useState } from "react"
import Form from "./components/Form"
import List from "./components/List"
import type { Task } from "./types/task";
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (
    title: string,
    category: string,
    deadline: string
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      category,
      deadline,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <main className="container">
      <h1>Task Manager</h1>

      <Form onAddTask={addTask} />

      <List tasks={tasks} />
    </main>
  );
}

export default App;
