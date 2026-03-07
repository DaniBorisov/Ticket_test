import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TicketList from "../components/TicketList";
import type { Ticket } from "../types";
import { closeTicket, getAllTickets } from "../services/ticketService";
import CloseTicketForm from "../components/CloseTicketForm";

const HandlerDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [message, setMessage] = useState("");

  const loadTickets = async () => {
    try {
      const data = await getAllTickets();
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

  const handleCloseSubmit = async (closeComment: string) => {
    if (!selectedTicket) return;

    await closeTicket(selectedTicket.id, { closeComment });
    setMessage(`Ticket "${selectedTicket.title}" was closed.`);
    setSelectedTicket(null);
    await loadTickets();
  };

  return (
    <div>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.grid}>
          <div>
            {selectedTicket ? (
              <CloseTicketForm
                ticket={selectedTicket}
                onSubmit={handleCloseSubmit}
                onCancel={() => setSelectedTicket(null)}
              />
            ) : (
              <div style={styles.placeholderCard}>
                <h3>Close Ticket</h3>
                <p>Select an open ticket to close it with a comment.</p>
              </div>
            )}
          </div>

          <div>
            <h2>All Tickets</h2>
            {message && <div style={styles.message}>{message}</div>}

            {loading ? (
              <p>Loading tickets...</p>
            ) : (
              <TicketList
                tickets={tickets}
                mode="HANDLER"
                onClose={(ticket) => {
                  setMessage("");
                  setSelectedTicket(ticket);
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
    color: "white",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(320px, 380px) 1fr",
    gap: "1.5rem",
    alignItems: "start",
  },
  placeholderCard: {
    background: "#fff",
    padding: "1rem",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
    color: "black",
  },
  message: {
    marginBottom: "1rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    background: "#d1e7dd",
  },
};

export default HandlerDashboard;