import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

type Props = {
  tasks: Task[];
  toggleTask: (id: string) => void;
  activeCount: number;
  completedCount: number;
};

function List({
  tasks,
  toggleTask,
  activeCount,
  completedCount,
}: Props) {
  return (
    <section>
      <h2>タスク一覧</h2>

      {tasks.length === 0 ? (
        <p>タスクはありません。</p>
      ) : (
        <><div className="task-summary">
          <p>未完了：{activeCount}件　完了：{completedCount}件</p>
        </div>
          <ul>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask} />
            ))}
          </ul></>
      )}
    </section>
  );
}

export default List;