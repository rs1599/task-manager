import type { Task } from "../types/task";

type Props = {
  task: Task;
  toggleTask: (id: string) => void;
};

function TaskItem({ task, toggleTask }: Props) {
  return (
    <div className="task-item">
      <details>
        <summary>
          <span className="summary-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              onClick={(e) => e.stopPropagation()}
            />

            <span>{task.title}</span>
          </span>
        </summary>

        <p className="task-description">
          {task.description}
        </p>

        <div className="task-info">
          <span>カテゴリ：{task.category}</span>
          <span>締切：{task.deadline}</span>
        </div>

      </details>
    </div>
  );
}

export default TaskItem;