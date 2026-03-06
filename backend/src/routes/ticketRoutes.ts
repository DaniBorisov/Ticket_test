import { Router } from "express";
import {
  closeTicketController,
  createTicketController,
  getAllTicketsController,
  getMyTicketsController,
  updateOwnTicketController,
} from "../controllers/ticketController";
import { authenticate } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("USER"),
  createTicketController
);

router.get(
  "/my",
  authenticate,
  authorizeRoles("USER"),
  getMyTicketsController
);

router.put(
  "/:id",
  authenticate,
  authorizeRoles("USER"),
  updateOwnTicketController
);

router.get(
  "/",
  authenticate,
  authorizeRoles("HANDLER"),
  getAllTicketsController
);

router.put(
  "/:id/close",
  authenticate,
  authorizeRoles("HANDLER"),
  closeTicketController
);

export default router;