import Post from '../../models/post/post.model';
import PostServiceDB from './post.service.db';

export default class PostCreateService {
  private postService: PostServiceDB;

  constructor(postService: PostServiceDB) {
    this.postService = postService;
  }

  async createPost(
    userId: string,
    title: string,
    postText: string,
    views: number,
  ): Promise<void> {
    try {
      const post = new Post(userId, title, postText, views);
      await post.generatePostId();

      await this.postService.savePost(post);
    } catch (error) {
      console.error('Ошибка при создании поста:', error.message);
      throw error;
    }
  }
}
