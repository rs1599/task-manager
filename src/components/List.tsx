import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

type Props = {
  tasks: Task[];
  toggleTask: (id: string) => void;
};

function List({ tasks, toggleTask }: Props) {
  return (
    <section>
      <h2>タスク一覧</h2>

      {tasks.length === 0 ? (
        <p>タスクはありません。</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem 
              key={task.id}
              task={task}
              toggleTask={toggleTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default List;