import api from "./api";
import type { Ticket } from "../types";

export interface CreateTicketPayload {
  title: string;
  description: string;
  dueDate: string;
}

export interface UpdateTicketPayload {
  title: string;
  description: string;
  dueDate: string;
}

export interface CloseTicketPayload {
  closeComment: string;
}

export const getMyTickets = async () => {
  const response = await api.get<Ticket[]>("/tickets/my");
  return response.data;
};

export const createTicket = async (payload: CreateTicketPayload) => {
  const response = await api.post<Ticket>("/tickets", payload);
  return response.data;
};

export const updateMyTicket = async (
  ticketId: number,
  payload: UpdateTicketPayload
) => {
  const response = await api.put<Ticket>(`/tickets/${ticketId}`, payload);
  return response.data;
};

export const getAllTickets = async () => {
  const response = await api.get<Ticket[]>("/tickets");
  return response.data;
};

export const closeTicket = async (
  ticketId: number,
  payload: CloseTicketPayload
) => {
  const response = await api.put<Ticket>(`/tickets/${ticketId}/close`, payload);
  return response.data;
};