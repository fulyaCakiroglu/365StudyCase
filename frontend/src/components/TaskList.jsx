import "./taskList.css"; 

export default function TaskList({ tasks, onStatusChange }) {
  const statusOptions = [
    { label: "Pending", value: 0 },
    { label: "InProgress", value: 1 },
    { label: "Completed", value: 2 },
  ];

  return (
    <div className="task-list-wrapper">
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.status === 2 ? "completed" : ""} style={{ marginBottom: "8px" }}>
            <strong>{task.title}</strong> {task.description}{" "}
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
          </li>
        ))}
      </ul>
    </div>
  );
}
