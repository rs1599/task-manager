import type { Task } from "../types/task";

type Props = {
  // 表示するタスク
  task: Task;

  // タスクの完了・未完了を切り替える処理
  toggleTask: (id: string) => void;
};

function TaskItem({ task, toggleTask }: Props) {
  return (
    <div className="task-item">
      <details>
        {/* タスク一覧のヘッダー */}
        <summary className="task-summary">
          <span className="summary-content">
            <span className="task-title">
              {task.title}
            </span>
          </span>

          {/* ステータスと締切日を表示 */}
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
              締切：{task.deadline.replaceAll("-", "/")}
            </span>
          </span>
        </summary>

        {/* タスクの説明 */}
        <p className="task-description">
          {task.description}
        </p>

        <div className="task-info">
          {/* タスクのカテゴリ */}
          <span>カテゴリ：{task.category}</span>

          {/* タスクの完了・未完了を切り替え */}
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