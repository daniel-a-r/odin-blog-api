import { Router } from 'express';
import controller from '../controllers/authController.js';

const router = new Router();

router.post('/sign-up', controller.signUpPost);
router.post('/login', controller.loginPost);
router.get('/refresh', controller.refreshGet);

export default router;
