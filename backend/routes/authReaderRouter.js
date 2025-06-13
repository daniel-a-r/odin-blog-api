import { Router } from 'express';
import controller from '../controllers/authReaderController.js';
import passportJwtAuth from '../config/passport.config.js';

const router = new Router();

router.post('/sign-up', controller.signUpPost);
router.post('/login', controller.loginPost);
router.get('/refresh', controller.refreshGet);

export default router;
