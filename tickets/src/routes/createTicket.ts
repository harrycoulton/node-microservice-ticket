import express, { Request, Response } from 'express';
import {routeAddresses} from './routeAddresses';
import {requireAuth, validateRequest} from '@hcoultonorg/common';
import {Ticket} from '../models/mongoose/Ticket';
import {body} from 'express-validator';

const router = express.Router();

const ticketValidationRules = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be greater than 0')
];

router.post(routeAddresses.POST_CREATE_TICKET,
    requireAuth,
    ticketValidationRules,
    validateRequest,
    async (req: Request, res: Response) => {

    const {title, price} = req.body

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });
    await ticket.save();

    res.status(201).send(ticket);
})

export { router as CreateTicketRouter };