import mongoose from 'mongoose';
import {app} from './app';

const start = async () => {
    process.env['JWT_KEY'] = 'production';
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY not set');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.log(err);
    }
}

app.listen(3000, () => {
  console.log("Tickets listening: 3000");
});


start();