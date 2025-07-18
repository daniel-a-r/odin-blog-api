import { Router } from 'express';
import controller from '../controllers/authController.js';
import passportJwtAuth from '../config/passport.config.js';

const router = new Router();

router.post('/sign-up', controller.signUpPost);
router.post('/login', controller.loginPost);
router.get('/refresh', controller.refreshGet);
router.get('/validate', passportJwtAuth, controller.validateGet);
router.get('/logout', controller.logoutGet);

export default router;
