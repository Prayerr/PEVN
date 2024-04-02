export interface IPost {
  postId: string;
  userId: string;
  title: string;
  postText: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  views: number;
}

export interface ICreatePostServiceDTO {
  userId: string;
  title: string;
  postText: string;
  views: number;
}
export interface ICreatePostDTO {
  title: string;
  postText: string;
}

export interface IUpdatePostDTO {
  title?: string;
  postText?: string;
}
export interface IPostCreateService {
  createPost(postData: ICreatePostServiceDTO): Promise<void>;
}

export interface IPostServiceDB {
  savePost(post: IPost): Promise<void>;
  updatePost(postId: string, newData: Partial<IUpdatePostDTO>): Promise<void>;
  deletePost(postId: string): Promise<void>;
  getPost(postId: string): Promise<IPost | null>;
}
