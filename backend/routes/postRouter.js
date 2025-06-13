import { Router } from 'express';
import controller from '../controllers/postController.js';

const router = new Router();

router.get('/', controller.allPostsGet);

export default router;