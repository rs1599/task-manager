import type { Task } from "../types/task";

type Props = {
  task: Task;
  toggleTask: (id: string) => void;
};

function TaskItem({ task, toggleTask }: Props) {
  return (
    <div className="task-item">
      <details>
        <summary className="task-summary">
          <span className="summary-content">
            <span className="task-title">
              {task.title}
            </span>
          </span>

          <span className="summary-right">
            <span
              className={
                task.completed
                  ? "task-status completed"
                  : "task-status active"
              }
            >
              {task.completed ? "完了" : "未完了"}
            </span>

            <span className="deadline">
              締切：{task.deadline}
            </span>
          </span>
        </summary>

        <p className="task-description">
          {task.description}
        </p>

        <div className="task-info">
          <span>カテゴリ：{task.category}</span>
          <button
            type="button"
            className={
              task.completed
                ? "status-button undo"
                : "status-button complete"
            }
            onClick={() => toggleTask(task.id)}
          >
            {task.completed ? "未完了に戻す" : "タスク完了"}
          </button>
        </div>

      </details>
    </div>
  );
}

export default TaskItem;