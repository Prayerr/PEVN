import { Response, Request } from 'express';
import UserServiceDB from '../services/user.service';
import User from '../models/user.model';

export default class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      const newUser = new User(name, email, password);

      await newUser.hashPassword();
      await newUser.generateToken();

      const userService = new UserServiceDB();
      const savedUser = await userService.saveUser(newUser);

      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
