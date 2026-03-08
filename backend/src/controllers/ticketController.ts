import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import {
  closeTicket,
  createTicket,
  getAllTickets,
  getMyTickets,
  updateOwnOpenTicket,
} from "../services/ticketService";

export const createTicketController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        message: "Title, description and dueDate are required",
      });
    }
    console.log("Authenticated user:", req.user);
    const ticket = await createTicket(
      title,
      description,
      dueDate,
      req.user!.userId
    );

    return res.status(201).json(ticket);
  } catch (error) {
    console.error("Create ticket error:", error);

    return res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to create ticket",
    });
  }
};

export const getMyTicketsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const tickets = await getMyTickets(req.user!.userId);

    return res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch tickets",
    });
  }
};

export const updateOwnTicketController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const ticketId = Number(req.params.id);
    const { title, description, dueDate } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({
        message: "Title, description and dueDate are required",
      });
    }

    const updatedTicket = await updateOwnOpenTicket(
      ticketId,
      req.user!.userId,
      title,
      description,
      dueDate
    );

    return res.status(200).json(updatedTicket);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "Ticket not found") {
        return res.status(404).json({ message: error.message });
      }

      if (
        error.message === "Forbidden" ||
        error.message === "Closed ticket cannot be edited"
      ) {
        return res.status(403).json({ message: error.message });
      }
    }

    return res.status(500).json({
      message: "Failed to update ticket",
    });
  }
};

export const getAllTicketsController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const tickets = await getAllTickets();

    return res.status(200).json(tickets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch all tickets",
    });
  }
};

export const closeTicketController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const ticketId = Number(req.params.id);
    const { closeComment } = req.body;

    if (!closeComment) {
      return res.status(400).json({
        message: "closeComment is required",
      });
    }

    const updatedTicket = await closeTicket(ticketId, closeComment);

    return res.status(200).json(updatedTicket);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      if (error.message === "Ticket not found") {
        return res.status(404).json({ message: error.message });
      }

      if (error.message === "Ticket already closed") {
        return res.status(400).json({ message: error.message });
      }
    }

    return res.status(500).json({
      message: "Failed to close ticket",
    });
  }
};