export default interface IComment {
  commentId: string;
  userId: string;
  postId: string;
  parentCommentId: string | null;
  commentText: string;
}
