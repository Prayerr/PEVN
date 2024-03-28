import { Response, Request } from 'express';
import { IPostDTO } from '../interfaces/post.interface';
// import PostServiceDB from '../services/post/post.service.db';
import PostCreateService from '../services/post/post.create.service';

// TODO: Дописать контроллер
export default class PostController {
  private postCreateService: PostCreateService;

  constructor(postCreateService: PostCreateService) {
    this.postCreateService = postCreateService;
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, postText } = req.body as IPostDTO;
      const userId = req.params.userId;

      await this.postCreateService.createPost(userId, title, postText, 0);

      res.json({ message: 'Пост успешно создан' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при создании поста' });
    }
  }
}
