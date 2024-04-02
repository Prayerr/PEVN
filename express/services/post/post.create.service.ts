import {
  ICreatePostServiceDTO,
  IPostCreateService,
} from '../../interfaces/post.interface';
import Post from '../../models/post/post.model';
import PostServiceDB from './post.service.db';

export default class PostCreateService implements IPostCreateService {
  private postService: PostServiceDB;

  constructor(postService: PostServiceDB) {
    this.postService = postService;
  }

  async createPost(postData: ICreatePostServiceDTO): Promise<void> {
    try {
      const { userId, title, postText, views } = postData;
      const post = new Post(userId, title, postText, views);
      await post.generatePostId();

      await this.postService.savePost(post);
    } catch (error) {
      console.error('Ошибка при создании поста:', error.message);
      throw error;
    }
  }
}
