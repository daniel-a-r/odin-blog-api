import { Router } from 'express';
import controller from '../../controllers/reader/commentReaderController.js';

const router = new Router();

router.post('/:postId/comment', controller.commentPost);
router.get('/:postId/comment', controller.allCommentsGet);
router.delete('/:postId/comment/:commentId', controller.commentDelete);

export default router;
