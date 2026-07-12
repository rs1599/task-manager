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

  const clearTasks = () => {
    const result = window.confirm("すべてのタスクを削除しますか？");

    if (result) {
      setTasks([]);
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

        <div>
          <label htmlFor="search">検索</label>
          <input
            id="search"
            type="text"
            placeholder="タイトル・説明で検索"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="categoryFilter">カテゴリ</label>

          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">すべて</option>
            <option value="学習">学習</option>
            <option value="仕事">仕事</option>
            <option value="プライベート">プライベート</option>
            <option value="買い物">買い物</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortOrder">並び替え</label>

          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value as
                  | "newest"
                  | "oldest"
                  | "deadline"
                  | "title"
              )
            }
          >
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
            <option value="deadline">期限が近い順</option>
            <option value="title">タイトル順</option>
          </select>
        </div>
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
