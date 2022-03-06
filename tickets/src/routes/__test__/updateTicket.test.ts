import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import {replaceParam} from '@hcoultonorg/common';
import {routeAddresses} from '../../routes/routeAddresses';

const putRoute = replaceParam(routeAddresses.PUT_UPDATE_TICKET, 'id', new mongoose.Types.ObjectId().toHexString());

it('returns a 404 if the provided id does not exist', async () => {
    await request(app)
        .put(putRoute)
        .set('Cookie', global.signIn())
        .send({
            title: 'aslkdfj',
            price: 20,
        })
        .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(putRoute)
        .send({
            title: 'aslkdfj',
            price: 20,
        })
        .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', global.signIn())
        .send({
            title: 'aslkdfj',
            price: 20,
        });

    await request(app)
        .put(replaceParam(routeAddresses.PUT_UPDATE_TICKET, 'id', response.body.id))
        .set('Cookie', global.signIn())
        .send({
            title: 'another',
            price: 400,
        })
        .expect(401);

});

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signIn();

    const response = await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', cookie)
        .send({
            title: 'asldkfj',
            price: 20,
        });

    await request(app)
        .put(replaceParam(routeAddresses.PUT_UPDATE_TICKET, 'id', response.body.id))
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20,
        })
        .expect(400);

    await request(app)
        .put(replaceParam(routeAddresses.PUT_UPDATE_TICKET, 'id', response.body.id))
        .set('Cookie', cookie)
        .send({
            title: 'alskdfjj',
            price: -10,
        })
        .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
    const cookie = global.signIn();

    const response = await request(app)
        .post(routeAddresses.POST_CREATE_TICKET)
        .set('Cookie', cookie)
        .send({
            title: 'asldkfj',
            price: 20,
        });

    await request(app)
        .put(replaceParam(routeAddresses.PUT_UPDATE_TICKET, 'id', response.body.id))
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 100,
        })
        .expect(200);

    const ticketResponse = await request(app)
        .get(replaceParam(routeAddresses.GET_TICKET, 'id', response.body.id))
        .send();

    expect(ticketResponse.body.title).toEqual('new title');
    expect(ticketResponse.body.price).toEqual(100);
});
