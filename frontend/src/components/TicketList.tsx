import type { Ticket } from "../types";

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
    <div style={styles.list}>
      {tickets.map((ticket) => (
        <div key={ticket.id} style={styles.card}>
          <div style={styles.header}>
            <h3 style={{ margin: 0 }}>{ticket.title}</h3>
            <span
              style={{
                ...styles.badge,
                background: ticket.status === "OPEN" ? "#4ebe26" : "#c13636",
              }}
            >
              {ticket.status}
            </span>
          </div>

          <p style={styles.meta}>
            Due: {new Date(ticket.dueDate).toLocaleString()}
          </p>

          <p>{ticket.description}</p>

          {ticket.user && (
            <p style={styles.meta}>
              Created by: {ticket.user.email} ({ticket.user.role})
            </p>
          )}

          {ticket.closeComment && (
            <div style={styles.commentBox}>
              <strong>Close Comment:</strong>
              <p style={{ margin: "0.5rem 0 0" }}>{ticket.closeComment}</p>
            </div>
          )}

          <div style={styles.actions}>
            {mode === "USER" && ticket.status === "OPEN" && onEdit && (
              <button style={styles.button} onClick={() => onEdit(ticket)}>
                Edit
              </button>
            )}

            {mode === "HANDLER" && ticket.status === "OPEN" && onClose && (
              <button style={styles.button} onClick={() => onClose(ticket)}>
                Close Ticket
              </button>
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
    background: "#ca7676",
    borderRadius: "12px",
    padding: "1rem",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
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
    color: "#555",
    fontSize: "0.95rem",
  },
  actions: {
    marginTop: "1rem",
    display: "flex",
    gap: "0.75rem",
  },
  button: {
    padding: "0.6rem 0.9rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    cursor: "pointer",
    background: "#a8a8a8",
  },
  commentBox: {
    marginTop: "1rem",
    padding: "0.75rem",
    background: "#f0f6f7",
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