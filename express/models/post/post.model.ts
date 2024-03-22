import IPost from '../../interfaces/post.interface';
import generateUUID from '../../utils/common/uuid.generator';

export default class Post implements IPost {
  postId: string;
  userId: string;
  title: string;
  postText: string;
  views: number;

  constructor(userId: string, title: string, postText: string, views: number) {
    this.userId = userId;
    this.title = title;
    this.postText = postText;
    this.views = views;
  }

  async generatePostId() {
    this.postId = await generateUUID();
  }
}
