import express from 'express';
import {routeAddresses} from './routeAddresses';

const router = express.Router();

router.post(routeAddresses.POST_SIGN_OUT, (req, res) => {
    req.session = null;

    // 204 No content
    res.status(204).send({});
});

export { router as SignOutRouter };