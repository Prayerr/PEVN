import { Router, Response, Request } from 'express';
import { checkPostExists } from '../middlewares/post.middleware';
import PostController from '../controllers/post.controller';
import PostServiceDB from '../services/post/post.service.db';
import PostCreateService from '../services/post/post.create.service';

const postRouter = Router();

const postServiceDB = new PostServiceDB();
const postCreateService = new PostCreateService(postServiceDB);
const postController = new PostController(postCreateService, postServiceDB);

postRouter.post('/:userId/create', async (req: Request, res: Response) => {
  await postController.createPost(req, res);
});

postRouter.put(
  '/:postId/update',
  checkPostExists,
  async (req: Request, res: Response) => {
    await postController.updatePost(req, res);
  },
);

postRouter.delete(
  '/:postId/delete',
  checkPostExists,
  async (req: Request, res: Response) => {
    await postController.deletePost(req, res);
  },
);

postRouter.get(
  '/:postId',
  checkPostExists,
  async (req: Request, res: Response) => {
    await postController.getPost(req, res);
  },
);

export default postRouter;
