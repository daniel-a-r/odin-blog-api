import { Router } from 'express';
import controller from '../../controllers/reader/postReaderController.js';

const router = new Router();

router.get('/', controller.allPostsGet);
router.get('/:id', controller.singlePostGet);

export default router;
