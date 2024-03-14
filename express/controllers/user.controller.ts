import { Response, Request, NextFunction } from 'express';
import UserServiceDB from '../services/user.service';
import User from '../models/user/user.model';
import UserSession from '../models/user/user.session';
import UserCredentials from '../models/user/user.credentials';

export default class UserController {
  async checkUserExists(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = req.params.userId;

    try {
      const userService = new UserServiceDB();
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

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, bio, avatarURL } = req.body;

    try {
      const user = new User(name, email, bio, avatarURL);

      await user.generateUserId();

      const userCredentials = new UserCredentials(user.userId, password);
      await userCredentials.generateUserCredentialsId();
      await userCredentials.hashPassword();

      const userSession = new UserSession(user.userId);
      await userSession.generateUserSessionId();
      await userSession.generateToken(email);

      const userService = new UserServiceDB();
      await userService.saveUser(user);
      await userService.saveUserCredentials(userCredentials);
      await userService.saveUserSession(userSession);

      res.json({ message: 'Пользователь успешно создан' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при создании пользователя' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    const newData = req.body;

    try {
      const userService = new UserServiceDB();
      const updatedUser = await userService.updateUser(userId, newData);

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось изменить пользователя' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;

    try {
      const userService = new UserServiceDB();
      await userService.deleteUser(userId);

      res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось удалить пользователя' });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;

    try {
      const userService = new UserServiceDB();
      const user = await userService.getUser(userId);

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении пользователя' });
    }
  }
}
