import { useState, type FormEvent } from "react";
import { validateTask } from "../utils/validation";
import Swal from "sweetalert2";

type Props = {
  onAddTask: (
    title: string,
    description: string,
    category: string,
    deadline: string
  ) => void;
};

function Form({ onAddTask }: Props) {
  // フォームの入力内容を管理
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  // フォーム送信時の処理
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // ページの再読み込みを防止
    e.preventDefault();

    // 入力内容をチェック
    const errors = validateTask(
      title,
      description,
      category,
      deadline
    );

    // 入力エラーがある場合は一覧で表示
    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "入力エラー",
        html: errors.map((error) => `• ${error}`).join("<br>"),
        confirmButtonText: "OK",
        scrollbarPadding: false,
      });

      return;
    }

    // 入力内容を親コンポーネントへ渡してタスクを追加
    onAddTask(title, description, category, deadline);

    // 入力フォームを初期化
    setTitle("");
    setDescription("");
    setCategory("");
    setDeadline("");

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">タスク名</label>
        <input
          id="title"
          type="text"
          placeholder="タスク名を入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="description">説明</label>
        <textarea
          id="description"
          placeholder="タスクの説明を入力"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="category">カテゴリ</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">選択してください</option>
          <option value="学習">学習</option>
          <option value="仕事">仕事</option>
          <option value="プライベート">プライベート</option>
          <option value="買い物">買い物</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div>
        <label htmlFor="deadline">期限</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <button type="submit" className="add-button">追加</button>
    </form>
  );
}

export default Form;