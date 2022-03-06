import express from "express";
import {NotFoundError} from '@hcoultonorg/common';
const router = express.Router();

router.use([]);

// Handle unknown routes
router.all('*', async (req, res) => {
    throw new NotFoundError();
});

export { router as RouterIndex }