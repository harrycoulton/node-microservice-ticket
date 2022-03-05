import express from 'express';
import { currentUser } from '../middlewares/currentUser';
import {routeAddresses} from './routeAddresses';

const router = express.Router();

router.get(routeAddresses.GET_CURRENT_USER, currentUser, (req, res) => {
    res.send({ currentUser: req.currentUser || null });
});

export { router as CurrentUserRouter };