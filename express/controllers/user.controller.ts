import { Response, Request, NextFunction } from 'express';
import { IUserDTO } from '../interfaces/user.interface';
import UserServiceDB from '../services/user/user.service.db';
import UserCreateService from '../services/user/user.create.service';

export default class UserController {
  private userCreationService: UserCreateService;

  constructor() {
    this.userCreationService = new UserCreateService();
  }
  // FIXME: Подправить отлов ошибки
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
    try {
      const { name, email, password, bio, avatarURL } = req.body as IUserDTO;
      if (!name || !email || !password) {
        res.status(400).json({ error: 'Отсутствуют обязательные данные' });
        return;
      }

      await this.userCreationService.createUser(
        name,
        email,
        password,
        bio,
        avatarURL,
      );

      res.json({ message: 'Пользователь успешно создан' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при создании пользователя' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const newData = req.body as IUserDTO;
      const userService = new UserServiceDB();
      const updatedUser = await userService.updateUser(userId, newData);

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось изменить пользователя' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const userService = new UserServiceDB();
      await userService.deleteUser(userId);

      res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось удалить пользователя' });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      const userService = new UserServiceDB();
      const user = await userService.getUser(userId);

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении пользователя' });
    }
  }
}
