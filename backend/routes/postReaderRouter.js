import { Router } from 'express';
import controller from '../controllers/postReaderController.js';
import passportJwtAuth from '../config/passport.config.js';

const router = new Router();

router.use(passportJwtAuth);
router.get('/', controller.allPostsGet);
router.get('/:id', controller.singlePostGet);

export default router;
