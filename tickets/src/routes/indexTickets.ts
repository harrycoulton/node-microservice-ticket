import express, { Request, Response } from 'express';
import {routeAddresses} from './routeAddresses';
import {Ticket} from '../models/mongoose/Ticket';

const router = express.Router();

router.get(routeAddresses.GET_INDEX_TICKETS, async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});

    res.send(tickets);
});


export { router as IndexTicketsRouter };