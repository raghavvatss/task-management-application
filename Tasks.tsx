import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      alert("Failed to fetch tasks");
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await api.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch {
      alert("Failed to create task");
    }
  };

  // 🔴 NEW: delete task
  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id)); // instant UI update
    } catch (err) {
        console.error(err);
      alert("Failed to delete task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="card" style={{ width: 420 }}>
        <h2>My Tasks</h2>
        <p style={{ color: "var(--muted)", marginTop: -8 }}>
          Keep track of what matters today
        </p>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <input
            type="text"
            placeholder="New task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #2a2f3a",
              }}
            >
              <span>{task.title}</span>
              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  background: "transparent",
                  color: "var(--danger)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={logout}
          style={{
            marginTop: 20,
            width: "100%",
            background: "#222",
            color: "var(--muted)",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Tasks;