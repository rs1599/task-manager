import Filter from "./components/Filter";
import Swal from "sweetalert2";
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
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "deadline" | "title">("newest");

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

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "タスクを追加しました",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
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

  const clearTasks = async () => {
    const result = await Swal.fire({
      title: "確認",
      text: "すべてのタスクを削除しますか？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      setTasks([]);

      await Swal.fire({
        title: "削除しました",
        text: "すべてのタスクを削除しました。",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const keyword = searchText.toLowerCase();

    if (filter === "active" && task.completed) {
      return false;
    }

    if (filter === "completed" && !task.completed) {
      return false;
    }

    if (
      !task.title.toLowerCase().includes(keyword) &&
      !task.description.toLowerCase().includes(keyword)
    ) {
      return false;
    }

    if (
      categoryFilter &&
      task.category !== categoryFilter
    ) {
      return false;
    }

    return true;
  });

  const sortedTasks = [...filteredTasks];

  switch (sortOrder) {
    case "oldest":
      sortedTasks.reverse();
      break;

    case "deadline":
      sortedTasks.sort((a, b) =>
        a.deadline.localeCompare(b.deadline)
      );
      break;

    case "title":
      sortedTasks.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;

    case "newest":
    default:
      break;
  }

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className="container">
      <h1>Task Manager</h1>

      <details open>
        <summary>タスク追加</summary>

        <Form onAddTask={addTask} />
      </details>

      <details open>
        <summary>検索・絞り込み</summary>

        <Filter
          filter={filter}
          setFilter={setFilter}
          searchText={searchText}
          setSearchText={setSearchText}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </details>

      <List
        tasks={sortedTasks}
        toggleTask={toggleTask}
        activeCount={activeCount}
        completedCount={completedCount}
      />
      <button
        className="clear-button"
        onClick={clearTasks}
      >
        すべて削除
      </button>
    </main>
  );
}

export default App;
