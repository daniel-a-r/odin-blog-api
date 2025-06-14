import { Router } from 'express';
import controller from '../controllers/authReaderController.js';

const router = new Router();

router.post('/sign-up', controller.signUpPost);
router.post('/login', controller.loginPost);

export default router;
