import { Response, Request } from 'express';
import { IUserDTO } from '../interfaces/user.interface';
import UserServiceDB from '../services/user/user.service.db';
import UserCreateService from '../services/user/user.create.service';

export default class UserController {
  private userCreationService: UserCreateService;
  private userServiceDB: UserServiceDB;

  constructor(
    userCreationService: UserCreateService,
    userServiceDB: UserServiceDB,
  ) {
    this.userCreationService = userCreationService;
    this.userServiceDB = userServiceDB;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, bio, avatarURL } = req.body as IUserDTO;

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
      const updatedUser = await this.userServiceDB.updateUser(userId, newData);

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Не удалось изменить пользователя' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      await this.userServiceDB.deleteUser(userId);

      res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось удалить пользователя' });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const user = await this.userServiceDB.getUser(userId);

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении пользователя' });
    }
  }
}
