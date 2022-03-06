import request from 'supertest';
import { app } from '../../app';
import {routeAddresses} from '../routeAddresses';
import {Ticket} from '../../models/mongoose/Ticket';

it('Has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .send({});

    expect(response.status).not.toEqual(404);
})

it('Can only be accessed if the user is signed in', async () => {
    await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .send({})
        .expect(401);
})

it('Returns !401 if user signed in', async () => {
    const response = await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie',  global.signIn())
        .send({});

    expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', global.signIn())
        .send({
            title: '',
            price: 10,
        })
        .expect(400);

    await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', global.signIn())
        .send({
            price: 10,
        })
        .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', global.signIn())
        .send({
            title: 'asldkjf',
            price: -10,
        })
        .expect(400);

    await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', global.signIn())
        .send({
            title: 'laskdfj',
        })
        .expect(400);
});

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'asldkfj';

    await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', global.signIn())
        .send({
            title,
            price: 20,
        })
        .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
});