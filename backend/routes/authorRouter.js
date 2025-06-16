import { Router } from 'express';
import controller from '../controllers/authorController.js';

const router = new Router();

router.use(controller.isAuthor);
router.route('/').post(controller.createPost).get(controller.allPostsGet);
router
  .route('/:id')
  .get(controller.singlePostGet)
  .put(controller.postUpdate)
  .delete(controller.postDelete);

export default router;
