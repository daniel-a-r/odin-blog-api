import { Router } from 'express';
import controller from '../controllers/postController.js';
import passportJwtAuth from '../config/passport.config.js';

const router = new Router();

router.use(passportJwtAuth);
router.post('/', controller.createPost);
router.get('/', controller.allPostsGet);
router.get('/:id', controller.singlePostGet);
router.put('/:id', controller.postUpdate);
router.delete('/:id', controller.postDelete);

export default router;
