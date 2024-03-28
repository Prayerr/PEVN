import { IPost } from '../../interfaces/post.interface';
import generateUUID from '../../utils/common/uuid.generator';

export default class Post implements IPost {
  postId: string;
  userId: string;
  title: string;
  postText: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  views: number;

  constructor(
    userId: string,
    title: string,
    postText: string,
    views: number,
    createdAt?: Date,
    updatedAt?: Date | null,
  ) {
    this.userId = userId;
    this.title = title;
    this.postText = postText;
    this.views = views;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async generatePostId() {
    this.postId = await generateUUID();
  }
}
