const BASE_URL = "http://localhost:5094/api/tasks";

export const getTasks = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTaskStatus = async (id, status) => {
  await fetch(`${BASE_URL}/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
};
