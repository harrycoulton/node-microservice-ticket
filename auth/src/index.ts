import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import { errorHandler } from './middlewares/errorHandler';
import { RouteIndex } from './routes';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
// This is to allow nginx ingress controller
app.set('trust proxy', true);
app.use(json());

// signed: Cookie not encrypted as JTW
// secure: Enforce HTTPS only connections
app.use(
    cookieSession({
      signed: false,
      // secure: true,
    })
)

app.use(RouteIndex);

app.use(errorHandler);

const start = async () => {
    process.env['JWT_KEY'] = 'production';
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not set');
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to db');
    } catch (err) {
        console.log(err);
    }
}

app.listen(3000, () => {
  console.log("Listening on port 3000: Round 8");
});


start();