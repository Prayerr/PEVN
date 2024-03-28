export interface IPost {
  postId: string;
  userId: string;
  title: string;
  postText: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  views: number;
}

export interface IPostDTO {
  title: string;
  postText: string;
}
