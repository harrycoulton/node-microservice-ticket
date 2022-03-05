import request from 'supertest';
import { app } from '../../app';
import {routeAddresses} from '../routeAddresses';

it('responds with details about the current user', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get(routeAddresses.GET_CURRENT_USER)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get(routeAddresses.GET_CURRENT_USER)
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
