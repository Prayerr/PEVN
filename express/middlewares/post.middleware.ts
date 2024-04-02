import { Request, Response, NextFunction } from 'express';
import PostServiceDB from '../services/post/post.service.db';

const postService = new PostServiceDB();

export async function checkPostExists(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const postId = req.params.postId;
    const post = await postService.getPost(postId);

    if (!post) {
      res.status(404).json({ error: 'Пост не найден' });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при проверке существования поста' });
  }
}
