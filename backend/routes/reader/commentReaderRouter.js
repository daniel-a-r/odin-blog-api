import { Router } from 'express';
import controller from '../../controllers/reader/commentReaderController.js';
import passportJwtAuth from '../../config/passport.config.js';

const router = new Router();

router.use(passportJwtAuth);
router.post('/:postId/comment', controller.commentPost);
router.get('/:postId/comment', controller.allCommentsGet);
router.delete('/:postId/comment/:commentId', controller.commentDelete);

export default router;
