import { Response, Request } from 'express';
import UserServiceDB from '../services/user.service';
import User from '../models/user.model';

export default class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, bio, avatarURL } = req.body;

    try {
      const user = new User(name, email, password, bio, avatarURL);

      await user.generateUUID();
      await user.hashPassword(password);
      await user.generateToken();

      const userService = new UserServiceDB();
      const savedUser = await userService.saveUser(user);

      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;

    try {
      const userService = new UserServiceDB();
      await userService.deleteUser(userId);

      res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;

    try {
      const userService = new UserServiceDB();
      const user = await userService.getUser(userId);

      if (!user) {
        res.status(404).json({ error: 'Пользователь не найден' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
