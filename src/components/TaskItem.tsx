import type { Task } from "../types/task";

type Props = {
  task: Task;
};

function TaskItem({ task }: Props) {
  return <li>{task.title}</li>;
}

export default TaskItem;