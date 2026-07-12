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
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        <div className="task-meta">
          {task.category && <span>{task.category}</span>}
          {task.deadline && <span>{task.deadline}</span>}
        </div>
      </div>
    </li>
  );
}

export default TaskItem;