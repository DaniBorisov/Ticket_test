import { type FormEvent, useState } from "react";
import type { Ticket } from "../types";

interface Props {
  ticket: Ticket;
  onSubmit: (closeComment: string) => Promise<void>;
  onCancel: () => void;
}

const CloseTicketForm = ({ ticket, onSubmit, onCancel }: Props) => {
  const [closeComment, setCloseComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!closeComment.trim()) {
      setError("Close comment is required.");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(closeComment);
    } catch (error) {
      setError("Failed to close ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h3>Close Ticket</h3>
      <p style={styles.meta}>
        <strong>{ticket.title}</strong>
      </p>

      <textarea
        style={styles.textarea}
        placeholder="Write the closing comment"
        value={closeComment}
        onChange={(e) => setCloseComment(e.target.value)}
      />

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.actions}>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Closing..." : "Close Ticket"}
        </button>
        <button
          type="button"
          style={styles.secondaryButton}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    background: "#fff",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  meta: {
    margin: 0,
    color: "#555",
  },
  textarea: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "120px",
    resize: "vertical",
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
  },
  button: {
    padding: "0.75rem 1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "crimson",
  },
};

export default CloseTicketForm;