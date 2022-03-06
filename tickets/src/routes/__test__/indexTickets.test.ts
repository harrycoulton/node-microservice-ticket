import request from 'supertest';
import { app } from '../../app';
import {routeAddresses} from '../routeAddresses';

const createTicket = (ticket: {title: string, price: number}) => {
    return request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', global.signIn())
        .send(ticket)
        .expect(201);
}

it('Returns all tickets', async () => {
    await createTicket({
            title: 'concert1',
            price: 10,
        });
    await createTicket({
            title: 'concert2',
            price: 20,
        });
    await createTicket({
        title: 'concert3',
        price: 30,
    });

    const response = await request(app)
        .get(routeAddresses.GET_INDEX_TICKETS)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);

})
