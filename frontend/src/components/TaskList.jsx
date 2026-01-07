import "./taskList.css";

export default function TaskList({ tasks, onStatusChange, onDelete, onEdit }) {
  const statusOptions = [
    { label: "ToDo", value: 0 },
    { label: "InProgress", value: 1 },
    { label: "Completed", value: 2 },
  ];

  return (
    <div className="task-list-wrapper">
      <ul>
        <li className="task-header-row">
          <div className="task-info"><strong>Başlık / Açıklama</strong></div>
          <div className="task-created"><strong>Oluşturulma Tarihi</strong></div>
          <div className="task-actions"><strong>Durum / İşlemler</strong></div>
        </li>

        {tasks.map((task) => (
          <li key={task.id} className={task.status === 2 ? "completed" : ""}>
            <div className="task-info" title={task.description}>
              <span><strong>{task.title}</strong></span>
              <span> - </span>
              <span>{task.description}</span>
            </div>

            <div className="task-created">
              {new Date(task.createdAt).toLocaleString("tr-TR")}
            </div>

            <div className="task-actions">
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, parseInt(e.target.value))}
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <button className="icon-btn delete" onClick={() => onDelete(task.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
