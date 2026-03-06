import { prisma } from "../prisma";
import { TicketStatus } from "@prisma/client";


export const createTicket = async (
  title: string,
  description: string,
  dueDate: string,
  userId: number
) => {
  console.log("Creating ticket with:", {
    title,
    description,
    dueDate,
    userId,
    parsedDate: new Date(dueDate),
  });

  return prisma.ticket.create({
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
      userId,
    },
  });
};

export const getMyTickets = async (userId: number) => {
  return prisma.ticket.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const updateOwnOpenTicket = async (
  ticketId: number,
  userId: number,
  title: string,
  description: string,
  dueDate: string
) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  if (ticket.userId !== userId) {
    throw new Error("Forbidden");
  }

  if (ticket.status === TicketStatus.CLOSED) {
    throw new Error("Closed ticket cannot be edited");
  }

  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      title,
      description,
      dueDate: new Date(dueDate),
    },
  });
};

export const getAllTickets = async () => {
  return prisma.ticket.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const closeTicket = async (
  ticketId: number,
  closeComment: string
) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  if (ticket.status === TicketStatus.CLOSED) {
    throw new Error("Ticket already closed");
  }

  return prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: TicketStatus.CLOSED,
      closeComment,
    },
  });
};