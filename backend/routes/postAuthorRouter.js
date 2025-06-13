import { Router } from 'express';
import controller from '../controllers/postAuthorController.js';
import passportJwtAuth from '../config/passport.config.js';

const router = new Router();

router.use(passportJwtAuth);
router.route('/').post(controller.createPost).get(controller.allPostsGet);
router
  .route('/:id')
  .get(controller.singlePostGet)
  .put(controller.postUpdate)
  .delete(controller.postDelete);

export default router;
