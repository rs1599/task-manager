import type { Task } from "../types/task";

type Props = {
  tasks: Task[];
};

function List({ tasks }: Props) {
  return (
    <section>
      <h2>タスク一覧</h2>

      {tasks.length === 0 ? (
        <p>タスクはありません。</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default List;