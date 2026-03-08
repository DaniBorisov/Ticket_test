import { useEffect,useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import type { Ticket } from "../types";

import {
  createTicket,
  getMyTickets,
  updateMyTicket,
} from "../services/ticketService";

type FilterStatus = "ALL" | "OPEN" | "CLOSED";

const UserDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("ALL");

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

    const filteredTickets = useMemo(() => {
    if (filter === "ALL") return tickets;
    return tickets.filter((ticket) => ticket.status === filter);
  }, [tickets, filter]);

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
        <div className=" flex md:gap-25 gap-5 flex-wrap md:flex-nowrap ">
          <div>
            <div className="flex sticky top-10 flex-col gap-5">
            <TicketForm
              onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
              initialTicket={editingTicket}
              submitLabel={editingTicket ? "Update Ticket" : "Create Ticket"}
              onCancelEdit={() => setEditingTicket(null)}
            />

            {message && <div style={styles.message}>{message}</div>}
            </div>
          </div>
          <div className="flex-col grow max-w-3/4 place-self-auto">
          <div className="mb-5"> 
            <h2>My Tickets</h2>
          </div>

          <div>
              <label htmlFor="user-status-filter">Filter by status:</label>
              <select
                id="user-status-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterStatus)}
              >
                <option value="ALL">All</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            {loading ? (
              <p>Loading tickets...</p>
            ) : (
              <TicketList 
                tickets={filteredTickets}
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
    padding: "2rem",
    paddingLeft: "3rem",
    background: "#ffffff",
    minHeight: "calc(100vh - 70px)",
  },
  message: {
    marginBottom: "1rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    background: "#d1e7dd",
  },
};

export default UserDashboard;