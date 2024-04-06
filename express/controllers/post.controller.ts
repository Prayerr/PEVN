import { Response, Request } from 'express';
import {
  ICreatePostDTO,
  IPostCreateService,
  IPostServiceDB,
  IUpdatePostDTO,
} from '../interfaces/post.interface';

export default class PostController {
  private postCreateService: IPostCreateService;
  private postServiceDB: IPostServiceDB;

  constructor(
    postCreateService: IPostCreateService,
    postServiceDB: IPostServiceDB,
  ) {
    this.postCreateService = postCreateService;
    this.postServiceDB = postServiceDB;
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, postText } = req.body as ICreatePostDTO;
      const userId = req.params.userId;

      await this.postCreateService.createPost({
        userId,
        title,
        postText,
        views: 0,
      });

      res.json({ message: 'Пост успешно создан' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при создании поста' });
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.postId;
      const newData = req.body as IUpdatePostDTO;

      await this.postServiceDB.updatePost(postId, newData);

      res.json({ message: 'Пост успешно изменён' });
    } catch (error) {
      res.status(500).json({ error: 'Возникла ошибка при изменении поста' });
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.postId;

      await this.postServiceDB.deletePost(postId);

      res.json({ message: 'Пост успешно удалён' });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось удалить пост' });
    }
  }

  async getPost(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.postId;
      const post = await this.postServiceDB.getPost(postId);

      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении поста' });
    }
  }
}
