import { useEffect, useState } from "react";
import { getTasks, createTask, updateTaskStatus } from "../api/taskApi";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (task) => {
    await createTask(task);
    loadTasks();
  };

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status);
    loadTasks();
  };

  return (
    <>
      <h1>Task Manager</h1>
      <TaskForm onCreate={handleCreate} />
      <TaskList tasks={tasks} onStatusChange={handleStatusChange} />
    </>
  );
}
