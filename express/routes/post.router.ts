import { Router, Response, Request } from 'express';
import PostController from '../controllers/post.controller';
import PostServiceDB from '../services/post/post.service.db';
import PostCreateService from '../services/post/post.create.service';

const postRouter = Router();

const postServiceDB = new PostServiceDB();
const postCreateService = new PostCreateService(postServiceDB);
const postController = new PostController(postCreateService);

postRouter.post('/:userId/create', async (req: Request, res: Response) => {
  await postController.createPost(req, res);
});

export default postRouter;
