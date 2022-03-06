import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import {app} from '../app';

declare global {
    function signIn(): string[];
}

let mongoServer: MongoMemoryServer;

const jwtkey  = 'testjwtkey';

beforeAll(async () => {
    process.env.JWT_KEY = jwtkey;
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
})

global.signIn = () => {
    const sessionJSON = JSON.stringify(
        { jwt: jwt.sign(
                {
                    id: new mongoose.Types.ObjectId().toHexString(),
                    email: 'test@test.com',
                }, jwtkey) }
    );

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`session=${base64}`];
};