import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

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
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default List;