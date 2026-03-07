import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <div>
        <strong>Ticket App</strong>
      </div>

      <div style={styles.right}>
        <span>
          {user?.email} ({user?.role})
        </span>
        <button style={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
    borderBottom: "1px solid #9b7070",
    background: "#657dd2",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  button: {
    padding: "0.5rem 0.9rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
};

export default Navbar;