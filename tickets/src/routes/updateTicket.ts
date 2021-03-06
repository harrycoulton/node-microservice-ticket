import express, { Request, Response } from 'express';
import {
    NotAuthorisedError,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@hcoultonorg/common';
import { Ticket } from '../models/mongoose/Ticket';
import {routeAddresses} from './routeAddresses';
import {body} from 'express-validator';

const router = express.Router();

const validationRules = [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be provided and must be greater than 0'),
];

router.put(
    routeAddresses.PUT_UPDATE_TICKET,
    requireAuth,
    validationRules,
    validateRequest,
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            throw new NotFoundError();
        }

        if (ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorisedError();
        }

        ticket.set({
            title: req.body.title,
            price: req.body.price,
        });
        await ticket.save();

        res.send(ticket);
    }
);

export { router as UpdateTicketRouter };
