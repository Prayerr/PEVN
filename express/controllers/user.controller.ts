import { Response, Request } from 'express';
import {
  IUserDTO,
  IUserCreateService,
  IUserServiceDB,
} from '../interfaces/user.interface';

export default class UserController {
  private userCreationService: IUserCreateService;
  private userServiceDB: IUserServiceDB;

  constructor(
    userCreationService: IUserCreateService,
    userServiceDB: IUserServiceDB,
  ) {
    this.userCreationService = userCreationService;
    this.userServiceDB = userServiceDB;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body as IUserDTO;

      await this.userCreationService.createUser(userData);

      res.json({ message: 'Пользователь успешно создан' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при создании пользователя' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const newData = req.body as IUserDTO;

      await this.userServiceDB.updateUser(userId, newData);

      res.json({ message: 'Данные профиля успешно обновлены' });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось обновить профиль' });
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
