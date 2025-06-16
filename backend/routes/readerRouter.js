import { Router } from 'express';
import controller from '../controllers/readerController.js';

const router = new Router();

router.get('/', controller.allPostsGet);
router.get('/:postId', controller.singlePostGet);
router.post('/:postId/comment', controller.commentPost);
router.get('/:postId/comment', controller.allCommentsGet);
router.delete('/:postId/comment/:commentId', controller.commentDelete);

export default router;
