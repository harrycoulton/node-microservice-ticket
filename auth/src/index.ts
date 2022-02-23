import express from "express";
import { json } from "body-parser";
import { CurrentUserRouter } from './routes/currentUser';
import {SignInRouter} from './routes/signIn';
import {SignOutRouter} from './routes/signOut';
import {SignUpRouter} from './routes/signUp';
import {errorHandler} from './middlewares/errorHandler';

const app = express();
app.use(json());

app.use(CurrentUserRouter);
app.use(SignInRouter);
app.use(SignOutRouter);
app.use(SignUpRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000: Round 8");
});
