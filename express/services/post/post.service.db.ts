import { IPostServiceDB } from '../../interfaces/post.interface';
import MainServiceDB from '../../repositories/main.repository';
import Post from '../../models/post/post.model';

export default class PostServiceDB
  extends MainServiceDB
  implements IPostServiceDB
{
  async savePost(post: Post): Promise<void> {
    const savePostQuery = {
      text: 'INSERT INTO post (post_id, account_id, title, post_text) VALUES ($1, $2, $3, $4)',
      values: [post.postId, post.userId, post.title, post.postText],
    };
    try {
      await this.startQuery(savePostQuery);
    } catch (error) {
      console.error('Ошибка при сохранении поста:', error.message);
      throw error;
    }
  }

  async updatePost(postId: string, newData: Partial<Post>): Promise<void> {
    const updateQuery = {
      text: 'UPDATE post SET title = $1, post_text = $2 WHERE post_id = $3',
      values: [newData.title || null, newData.postText || null, postId],
    };

    try {
      await this.startQuery(updateQuery);
    } catch (error) {
      console.error('Ошибка при обновлении поста:', error.message);
      throw error;
    }
  }

  async deletePost(postId: string): Promise<void> {
    const deleteQuery = {
      text: 'DELETE FROM post WHERE post_id = $1',
      values: [postId],
    };

    try {
      await this.startQuery(deleteQuery);
    } catch (error) {
      console.error('Ошибка при удалении поста:', error.message);
      throw error;
    }
  }

  async getPost(postId: string): Promise<Post | null> {
    const getQuery = {
      text: 'SELECT post_id, account_id, title, post_text, created_at, updated_at, views FROM post WHERE post_id = $1',
      values: [postId],
    };

    try {
      const result = await this.startQuery(getQuery);

      if (result.rows.length === 0) {
        return null;
      }

      const postData = result.rows[0];
      const post = new Post(
        postData.account_id,
        postData.title,
        postData.post_text,
        postData.created_at,
        postData.updated_at,
        postData.views,
      );

      return post;
    } catch (error) {
      console.error('Ошибка при получении поста:', error.message);
      throw error;
    }
  }
}
