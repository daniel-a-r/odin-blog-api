import { Router } from 'express';
import controller from '../controllers/authController.js';

const router = new Router();

router.get('/refresh', controller.refreshGet);

export default router;
