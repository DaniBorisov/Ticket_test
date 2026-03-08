import type { Ticket } from "../types";
import { Button } from "./ui/button";

interface Props {
  tickets: Ticket[];
  mode: "USER" | "HANDLER";
  onEdit?: (ticket: Ticket) => void;
  onClose?: (ticket: Ticket) => void;
}

const TicketList = ({ tickets, mode, onEdit, onClose }: Props) => {
  if (tickets.length === 0) {
    return (
      <div style={styles.emptyState}>
        <p>No tickets found yet.</p>
      </div>
    );
  }

  return (
    <div style={styles.list} >
      {tickets.map((ticket) => (
        <div key={ticket.id} style={styles.card} className="shadow-md">
          <div style={styles.header}  >
            <h3 className="font-medium leading-snug" >{ticket.title}</h3>
            <span
              style={{
                ...styles.badge,
                background: ticket.status === "OPEN" ? "#6fda48" : "#c13636",
                color: ticket.status === "OPEN" ? "black" : " white"
              }}
            >
              {ticket.status}
            </span>
          </div>

          <p style={styles.meta}>
            Due Date: {new Date(ticket.dueDate).toLocaleString()}
          </p>

          <p>{ticket.description}</p>

          {ticket.user && (
            <p style={styles.meta}>
              Created by: {ticket.user.email} ({ticket.user.role})
            </p>
          )}

          {ticket.closeComment && (
            <div style={styles.commentBox} className="shadow-md">
              <strong>Close Comment:</strong>
              <p style={{ margin: "0.5rem 0 0" }}>{ticket.closeComment}</p>
            </div>
          )}

          <div style={styles.actions}>
            {mode === "USER" && ticket.status === "OPEN" && onEdit && (
              <Button onClick={() => onEdit(ticket)}>
                Edit
              </Button>
            )}

            {mode === "HANDLER" && ticket.status === "OPEN" && onClose && (
              <Button onClick={() => onClose(ticket)}>
                Close Ticket
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  list: {
    display: "grid",
    gap: "1rem",
  },
  card: {
    background: "#f4f4f4",
    borderRadius: "12px",
    padding: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
  },
  badge: {
    padding: "0.35rem 0.7rem",
    borderRadius: "999px",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  meta: {
    color: "#000000",
    fontSize: "0.95rem",
  },
  actions: {
    marginTop: "1rem",
    display: "flex",
    gap: "0.75rem",
  },
  commentBox: {
    marginTop: "1rem",
    padding: "0.75rem",
    background: "#ffffff",
    borderRadius: "8px",
    color: "black",
  },
  emptyState: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
  },
};

export default TicketList;