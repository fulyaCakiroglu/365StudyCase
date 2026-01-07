import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTaskStatus } from "../api/taskApi";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./taskPage.css";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data || []);
    } catch (error) {
      console.error("Görevler yüklenemedi:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (task) => {
    try {
      await createTask(task);
      loadTasks();
    } catch (error) {
      console.error("Görev eklenemedi:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      loadTasks();
    } catch (error) {
      console.error("Görev durumu güncellenemedi:", error);
    }
  };

  return (
    <div className="task-page-wrapper">
      <ToastContainer />
      <div className="task-container">
        <h1>Task Manager</h1>
        <div className="task-form-section">
          <TaskForm onCreate={handleCreate} />
        </div>
        <div className="task-list-section">
          <TaskList tasks={tasks} onStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
}
