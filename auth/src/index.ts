import mongoose from 'mongoose';
import {app} from './app';

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