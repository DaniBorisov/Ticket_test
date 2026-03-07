export type Role = "USER" | "HANDLER";

export interface AuthUser {
  id: number;
  email: string;
  role: Role;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "OPEN" | "CLOSED";
  closeComment: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user?: {
    id: number;
    email: string;
    role: Role;
  };
}