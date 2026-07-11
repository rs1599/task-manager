import type { Task } from "../types/task";

type Props = {
  task: Task;
  toggleTask: (id: string) => void;
};

function TaskItem({ task, toggleTask }: Props) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      {task.title}
    </li>
  );
}

export default TaskItem;