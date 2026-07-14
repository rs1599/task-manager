import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

type Props = {
  // 表示するタスク一覧
  tasks: Task[];

  // タスクの完了・未完了を切り替える処理
  toggleTask: (id: string) => Promise<void>;

  // 未完了タスク数
  activeCount: number;

  // 完了タスク数
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

      {/* タスクがない場合はメッセージを表示 */}
      {tasks.length === 0 ? (
        <p>タスクはありません</p>
      ) : (
        <>
          {/* タスクの件数を表示 */}
          <div className="task-summary">
            <p>未完了：{activeCount}件　完了：{completedCount}件</p>
          </div>

          {/* タスク一覧を表示 */}
          <div className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default List;