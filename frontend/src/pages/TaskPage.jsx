import { useEffect, useState } from "react";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "../api/taskApi";
import TaskList from "../components/TaskList";
import TaskAddingModal from "../components/TaskAddingModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./taskPage.css";
  function LoadingSpinner() {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }
export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 8;
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data || []);
    } catch (error) {
      console.error("Görevler yüklenemedi:", error);
      toast.error("Görevler yüklenemedi!");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (task) => {
    try {
      setIsLoading(true);
      await createTask(task);
      setIsModalOpen(false);
      loadTasks();
        setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false);
      toast.success("Görev başarıyla eklendi!");
    }, 1000);
    } catch (error) {
      console.error("Görev eklenemedi:", error);
      toast.error("Görev eklenemedi!");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      loadTasks();
      toast.info("Görev durumu güncellendi!");
    } catch (error) {
      console.error("Görev durumu güncellenemedi:", error);
      toast.error("Görev durumu güncellenemedi!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Görev silindi!");
    } catch (error) {
      toast.error(error.message);
    }
  };
return (
    <div className="task-page-wrapper">
      {isLoading && <LoadingSpinner />}
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="task-container">
        <div className="task-header">
          <h1>Task Manager</h1>
          <button className="add-task-btn" onClick={() => setIsModalOpen(true)}>
            Yeni Görev Ekle
          </button>
        </div>

        <div className="task-list-section">
          <TaskList
          
            tasks={currentTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        <div className="pagination">
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            &lt;
          </button>

          <button className="active">
            {currentPage}
          </button>

          <button onClick={handleNext} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
        </div>
      </div>

      <TaskAddingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />

    </div>
  );
}
