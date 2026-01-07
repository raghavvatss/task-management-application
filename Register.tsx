import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { email, password });
      navigate("/login");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>
          <span className="wave">👋</span> Create account
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />

          <br /><br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <br /><br />

          <button type="submit" style={{ width: "100%" }}>
            Register
          </button>
        </form>

        {error && <p style={{ color: "var(--danger)", marginTop: 10 }}>{error}</p>}

        <p style={{ marginTop: 16, fontSize: 14 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}