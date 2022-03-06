import express from "express";
import {currentUser, NotFoundError} from '@hcoultonorg/common';
import {CreateTicketRouter} from './createTicket';
import {GetTicketRouter} from './getTicket';
import {IndexTicketsRouter} from './indexTickets';
import {UpdateTicketRouter} from './updateTicket';
const router = express.Router();

router.use(currentUser);

router.use([
    CreateTicketRouter,
    GetTicketRouter,
    IndexTicketsRouter,
    UpdateTicketRouter,
]);

// Handle unknown routes
router.all('*', async (req, res) => {
    throw new NotFoundError();
});

export { router as RouterIndex }
