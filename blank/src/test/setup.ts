import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import {app} from '../app';
import jwt from 'jsonwebtoken';

declare global {
    function signIn(): string[];
}

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    process.env.JWT_KEY = 'testJwtKey';
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
                id: '11hkj3h2',
                email: 'test@test.com',
            }, process.env.JWT_KEY!) }
    );

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`express:sess=${base64}`];
};