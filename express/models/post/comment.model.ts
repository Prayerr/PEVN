import IComment from '../../interfaces/comment.interface';
import generateUUID from '../../utils/common/uuid.generator';

export default class Post implements IComment {
  commentId: string;
  userId: string;
  postId: string;
  parentCommentId: string | null;
  commentText: string;

  constructor(
    userId: string,
    postId: string,
    parentCommentId: string | null,
    commentText: string,
  ) {
    this.userId = userId;
    this.postId = postId;
    this.parentCommentId = parentCommentId;
    this.commentText = commentText;
  }

  async generatePostId() {
    this.commentId = await generateUUID();
  }
}
