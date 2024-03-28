import { Request, Response, NextFunction } from 'express';
import UserServiceDB from '../services/user/user.service.db';

const userService = new UserServiceDB();

export async function checkUserExists(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const userId = req.params.userId;
    const user = await userService.getUser(userId);

    if (!user) {
      res.status(404).json({ error: 'Пользователь не найден' });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Ошибка при проверке существования пользователя' });
  }
}
