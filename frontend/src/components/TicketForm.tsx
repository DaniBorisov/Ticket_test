import {type  FormEvent, useEffect, useState } from "react";
import type { Ticket } from "../types";
import { Button } from "./ui/button";

interface Props {
  onSubmit: (data: {
    title: string;
    description: string;
    dueDate: string;
  }) => Promise<void>;
  initialTicket?: Ticket | null;
  submitLabel: string;
  onCancelEdit?: () => void;
}

const formatDateForInput = (dateString: string) => {
  return new Date(dateString).toISOString().slice(0, 16);
};

const TicketForm = ({
  onSubmit,
  initialTicket,
  submitLabel,
  onCancelEdit,
}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialTicket) {
      setTitle(initialTicket.title);
      setDescription(initialTicket.description);
      setDueDate(formatDateForInput(initialTicket.dueDate));
      setError("");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [initialTicket]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!title || !description || !dueDate) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await onSubmit({
        title,
        description,
        dueDate: new Date(dueDate).toISOString(),
      });

      if (!initialTicket) {
        setTitle("");
        setDescription("");
      }
    } catch (err) {
      setError("Failed to save ticket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h3>{initialTicket ? "Edit Ticket" : "Create Ticket"}</h3>

      <input
        style={styles.input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={styles.textarea}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        style={styles.input}
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.actions}>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
        </Button>

        {initialTicket && onCancelEdit && (
          <Button
            variant={"secondary"}
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    background: "#ffffff",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f0f6f7",
    color: "black",
  },
  textarea: {
    padding: "0.75rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "110px",
    resize: "vertical",
    background: "#f0f6f7",
    color: "black",
  },
  actions: {
    display: "flex",
    gap: "0.75rem",
  },

  error: {
    color: "crimson",
  },
};

export default TicketForm;