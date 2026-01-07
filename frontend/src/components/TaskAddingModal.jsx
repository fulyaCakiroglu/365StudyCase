import TaskForm from "./TaskForm";
import "../pages/taskPage.css";

export default function TaskModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Yeni Görev Ekle</h2>
        <TaskForm onCreate={onCreate} />
      </div>
    </div>
  );
}
