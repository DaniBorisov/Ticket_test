import { type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("user123");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    if (user.role === "USER") {
      navigate("/dashboard");
    } else {
      navigate("/handler");
    }
  }, [user, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const loggedInUser = await login(email, password);

      if (loggedInUser.role === "USER") {
        navigate("/dashboard");
      } else {
        navigate("/handler");
      }
    } catch (err) {
      setError("Login failed. Check your credentials.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1>Ticket Handling App</h1>

        <label>Email</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} type="submit">
          Login
        </button>

        <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          <p>User: user@test.com / user123</p>
          <p>Handler: handler@test.com / handler123</p>
        </div>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#e3b3b3",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    borderRadius: "12px",
    background: "#ca7676",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #1f1919",
  },
  button: {
    padding: "0.9rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: {
    color: "crimson",
  },
};

export default LoginPage;