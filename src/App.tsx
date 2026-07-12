import { useEffect, useState } from "react"
import Form from "./components/Form"
import List from "./components/List"
import type { Task } from "./types/task";
import './App.css'

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTask = (
    title: string,
    description: string,
    category: string,
    deadline: string
  ) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      category,
      deadline,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className="container">
      <h1>Task Manager</h1>

      <Form onAddTask={addTask} />

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>
          すべて
        </button>

        <button onClick={() => setFilter("active")}>
          未完了
        </button>

        <button onClick={() => setFilter("completed")}>
          完了
        </button>
      </div>

      <div className="task-summary">
        <p>未完了：{activeCount}件</p>
        <p>完了：{completedCount}件</p>
      </div>

      <List 
        tasks={filteredTasks}
        toggleTask={toggleTask}
      />
    </main>
  );
}

export default App;
