import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

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
        <Button variant={"secondary"} onClick={handleLogout}>
          Logout
        </Button>
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
    background: "#000000",
    color: "white"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
};

export default Navbar;