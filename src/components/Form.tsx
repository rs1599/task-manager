import { useState } from "react";

function Form() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  return (
    <section>
      <h2>タスク追加</h2>

      <form>
        <div>
          <label htmlFor="title">タスク名</label>
          <input
            id="title"
            type="text"
            placeholder="資格勉強"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category">カテゴリ</label>
          <input
            id="category"
            type="text"
            placeholder="学習"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
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

        <button type="submit">追加</button>
      </form>
    </section>
  );
}

export default Form;