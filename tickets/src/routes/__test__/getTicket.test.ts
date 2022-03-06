import request from 'supertest';
import { app } from '../../app';
import {routeAddresses} from '../routeAddresses';
import {replaceParam} from '../../helpers/replaceParam';
import mongoose from 'mongoose';

it('Returns 404 if ticket not found', async () => {
    await request(app)
        .get(replaceParam(routeAddresses.GET_TICKET, 'id', new mongoose.Types.ObjectId().toHexString()))
        .send()
        .expect(404);
})

it('Returns ticket if ticket is found', async () => {
    const ticket = {
        title: 'Concert',
        price: 20,
    }

    const response = await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', global.signIn())
        .send(ticket)
        .expect(201);

    const ticketResponse = await request(app)
        .get(replaceParam(routeAddresses.GET_TICKET, 'id', response.body.id))
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(ticket.title);
    expect(ticketResponse.body.price).toEqual(ticket.price);
})
