import { Router } from 'express';
import controller from '../controllers/readerController.js';
import passportJwtAuth from '../config/passport.config.js';

const router = new Router();

router.get('/', controller.allPostsGet);
router.get('/:postId', controller.singlePostGet);
router.post('/:postId/comment', passportJwtAuth, controller.commentPost);
router.get('/:postId/comment', controller.allCommentsGet);
router.delete('/:postId/comment/:commentId', passportJwtAuth, controller.commentDelete);

export default router;
