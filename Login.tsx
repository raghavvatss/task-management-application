import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>
          <span className="wave">👋</span> Welcome back
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 20 }}>
          Login to continue
        </p>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br /><br />

          <button type="submit" style={{ width: "100%" }}>
            Login
          </button>
        </form>

        {error && <p style={{ color: "var(--danger)", marginTop: 10 }}>{error}</p>}

        <p style={{ marginTop: 16, fontSize: 14 }}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;