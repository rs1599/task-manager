import Filter from "./components/Filter";
import Swal from "sweetalert2";
import { useEffect, useState } from "react"
import Form from "./components/Form"
import List from "./components/List"
import type { Task } from "./types/task";
import './App.css'

function App() {
  // タスク一覧を管理（初回はlocalStorageから読み込み）
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 検索・絞り込み条件を管理
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "deadline" | "title">("newest");

  // タスクを追加
  const addTask = (
    title: string,
    description: string,
    category: string,
    deadline: string
  ) => {
    // 入力内容から新しいタスクを作成
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      category,
      deadline,
      completed: false,
    };

    // タスク一覧へ追加
    setTasks((prev) => [...prev, newTask]);

    // タスク追加完了の通知を表示
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "タスクを追加しました",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      scrollbarPadding: false,
    });
  };

  // タスクの完了・未完了を切り替え
  const toggleTask = async (id: string) => {
    // 対象のタスクを取得
    const task = tasks.find((task) => task.id === id);

    if (!task) return;

    // 切り替え前に確認ダイアログを表示
    const result = await Swal.fire({
      title: task.completed ? "未完了に戻しますか？" : "完了にしますか？",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "はい",
      cancelButtonText: "いいえ",
      scrollbarPadding: false,
    });

    if (!result.isConfirmed) {
      return;
    }

    // 完了状態を反転
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // タスクをすべて削除
  const clearTasks = async () => {

    // タスクがない場合は削除できないことを通知
    if (tasks.length === 0) {
      await Swal.fire({
        title: "削除できません",
        text: "削除できるタスクがありません。",
        icon: "info",
        confirmButtonText: "OK",
        scrollbarPadding: false,
      });
      return;
    }

    // 削除確認ダイアログを表示
    const result = await Swal.fire({
      title: "確認",
      text: "すべてのタスクを削除しますか？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "削除",
      cancelButtonText: "キャンセル",
      confirmButtonColor: "#d33",
      scrollbarPadding: false,
    });

    if (result.isConfirmed) {
      // タスクをすべて削除
      setTasks([]);

      // 削除完了メッセージを表示
      await Swal.fire({
        title: "削除しました",
        text: "すべてのタスクを削除しました。",
        icon: "success",
        confirmButtonText: "OK",
        scrollbarPadding: false,
      });
    }
  };

  // 検索・絞り込み条件に一致するタスクを抽出
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

  // 選択された並び順でタスクを並び替え
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

  // 未完了・完了タスク数を集計
  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  // タスク変更時にlocalStorageへ保存
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <main className="container">
      <h1>Task Manager</h1>

      <details className="panel">
        <summary>タスク追加</summary>

        <Form onAddTask={addTask} />
      </details>

      <details className="panel">
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