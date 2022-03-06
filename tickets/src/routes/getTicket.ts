import express, { Request, Response } from 'express';
import {routeAddresses} from './routeAddresses';
import {Ticket} from '../models/mongoose/Ticket';
import {NotFoundError} from '@hcoultonorg/common';

const router = express.Router();

router.get(routeAddresses.GET_TICKET, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    res.send(ticket);
});


export { router as GetTicketRouter };
