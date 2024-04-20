import { Response, Request } from 'express';
import {
  IUserRepository,
  IUserCredentialsRepository,
} from '../interfaces/repository.interface';
import {
  IUserCreateService,
  IAuthService,
} from '../interfaces/service.interface';
import { IUserDTO } from '../interfaces/user.interface';

export default class UserController {
  private userCreationService: IUserCreateService;
  private userRepository: IUserRepository;
  private authService: IAuthService;
  private userCredentialsRepository: IUserCredentialsRepository;

  constructor(
    userCreationService: IUserCreateService,
    userRepository: IUserRepository,
    authService: IAuthService,
    userCredentialsRepository: IUserCredentialsRepository,
  ) {
    this.userCredentialsRepository = userCredentialsRepository;
    this.userCreationService = userCreationService;
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body as IUserDTO;
      const ipAddress = req.ip ?? 'Неизвестный IP';
      const deviceType = req.headers['user-agent'] ?? 'Неизвестное устройство';

      await this.userCreationService.createUser(
        userData,
        ipAddress,
        deviceType,
      );

      res.json({ message: 'Пользователь успешно создан' });
    } catch (error) {
      if (error.code === '23505') {
        res
          .status(409)
          .json({ error: 'Данный email или имя пользователя уже занято' });
      } else {
        res.status(500).json({ error: 'Ошибка при создании пользователя' });
      }
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    const userCredentials = await this.userCredentialsRepository.getUserByEmail(
      email,
    );

    if (!userCredentials) {
      res.status(404).json({ error: 'Пользователь не найден' });
      return;
    }

    const isPasswordValid = await this.authService.verifyPassword(
      password,
      userCredentials.passwordHash,
    );

    if (!isPasswordValid) {
      res
        .status(401)
        .json({ error: 'Неправильный пароль или имя пользователя' });
      return;
    }

    const tokens = await this.authService.refreshTokens(
      userCredentials.userId,
      email,
    );

    res.cookie('access_token', tokens.accessToken, { httpOnly: true });
    res.json(tokens);
  }

  async logoutUser(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('access_token');

      res.json({ message: 'Вы успешно вышли из профиля' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при выходе из профиля' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const newData = req.body as IUserDTO;

      await this.userRepository.updateUser(userId, newData);

      res.json({ message: 'Данные профиля успешно обновлены' });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось обновить профиль' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      await this.userRepository.deleteUser(userId);

      res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось удалить пользователя' });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const user = await this.userRepository.getUser(userId);

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении пользователя' });
    }
  }

  async refreshTokens(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user.userId;
      const email = req.user.email;

      const tokens = await this.authService.refreshTokens(userId, email);

      res.cookie('access_token', tokens.accessToken, { httpOnly: true });
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при обновлении токенов' });
    }
  }
}
