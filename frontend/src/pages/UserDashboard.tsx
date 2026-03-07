import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import type { Ticket } from "../types";
import {
  createTicket,
  getMyTickets,
  updateMyTicket,
} from "../services/ticketService";

const UserDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadTickets = async () => {
    try {
      const data = await getMyTickets();
      setTickets(data);
    } catch (error) {
      console.error("Failed to load tickets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleCreateTicket = async (data: {
    title: string;
    description: string;
    dueDate: string;
  }) => {
    await createTicket(data);
    setMessage("Ticket created successfully.");
    await loadTickets();
  };

  const handleUpdateTicket = async (data: {
    title: string;
    description: string;
    dueDate: string;
  }) => {
    if (!editingTicket) return;

    await updateMyTicket(editingTicket.id, data);
    setMessage("Ticket updated successfully.");
    setEditingTicket(null);
    await loadTickets();
  };

  return (
    <div>
      <Navbar />

      <div style={styles.page} >
        <div style={styles.grid} >
          <div>
            <TicketForm
              onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
              initialTicket={editingTicket}
              submitLabel={editingTicket ? "Update Ticket" : "Create Ticket"}
              onCancelEdit={() => setEditingTicket(null)}
            />
          </div>

          <div>
            <h2>My Tickets</h2>
            {message && <div style={styles.message}>{message}</div>}

            {loading ? (
              <p>Loading tickets...</p>
            ) : (
              <TicketList
                tickets={tickets}
                mode="USER"
                onEdit={(ticket) => {
                  setMessage("");
                  setEditingTicket(ticket);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "1.5rem",
    background: "#e3b3b3",
    minHeight: "calc(100vh - 70px)",
  },
    grid: {
    display: "grid",
    gridTemplateColumns: "minmax(320px, 380px) 1fr",
    gap: "1.5rem",
    alignItems: "start",
    },
    message: {
    marginBottom: "1rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    background: "#d1e7dd",
  },
};

export default UserDashboard;