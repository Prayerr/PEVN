import { inject } from 'inversify';
import { Request, Response } from 'express';
import IUserDTO from '../../app/dtos/user';
import {
  controller,
  httpPost,
  httpPut,
  httpDelete,
  httpGet,
  request,
  response,
} from 'inversify-express-utils';
import {
  IUserRepository,
  IUserCredentialsRepository,
  IUserCreateService,
  IAuthService,
} from '../../domain/interfaces';

@controller('/profile')
export default class UserController {
  constructor(
    @inject('IUserCreateService')
    private userCreationService: IUserCreateService,
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IAuthService') private authService: IAuthService,
    @inject('IUserCredentialsRepository')
    private userCredentialsRepository: IUserCredentialsRepository,
  ) {}

  /*private formatUserForResponse(user: IUserDTO, currentUser: IUserDTO): IUserDTO | (IPublicUser & { isMyProfile: boolean }) {
      const isMyProfile = currentUser && currentUser.userId === user.userId;
      return isMyProfile
        ? { ...user, isMyProfile: true }
        : {
            name: user.name,
            registrationDate: user.registrationDate ?? '',
            avatarURL: user.avatarURL ?? null,
            bio: user.bio ?? null,
            isMyProfile: false,
          };
    } */

  @httpPost('/register')
  async createUser(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    try {
      const userData = req.body as IUserDTO;
      const ipAddress = req.ip ?? 'Неизвестный IP';
      const deviceType = req.headers['user-agent'] ?? 'Неизвестное устройство';

      const newUser = await this.userCreationService.createUser(
        userData,
        ipAddress,
        deviceType,
      );

      res.cookie('access_token', newUser.accessToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      });

      res.json({ message: 'Пользователь успешно создан', user: newUser });
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

  @httpPost('/login')
  async loginUser(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    const { email, password } = req.body;

    const userCredentials =
      await this.userCredentialsRepository.getUserByEmail(email);

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

  @httpPost('/logout')
  async logoutUser(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    try {
      res.clearCookie('access_token');
      res.json({ message: 'Вы успешно вышли из профиля' });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при выходе из профиля' });
    }
  }

  @httpPut('/:userId/update')
  async updateUser(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const newData = req.body as IUserDTO;

      await this.userRepository.updateUser(userId, newData);

      res.json({ message: 'Данные профиля успешно обновлены' });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось обновить профиль' });
    }
  }

  @httpDelete('/:userId/delete')
  async deleteUser(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    try {
      const { userId } = req.params;

      await this.userRepository.deleteUser(userId);

      res.json({ message: 'Пользователь успешно удален' });
    } catch (error) {
      res.status(500).json({ error: 'Не удалось удалить пользователя' });
    }
  }

  @httpGet('/:username')
  async getUser(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    try {
      const { username } = req.params;
      //const currentUser = req.user;

      const user = await this.userRepository.getUser(username, null);

      //const formattedUser = this.formatUserForResponse(user, currentUser);

      res.json({ user: user });
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при получении пользователя' });
    }
  }

  @httpPost('/refresh')
  async refreshTokens(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    try {
      const { userId, email } = req.user;

      const tokens = await this.authService.refreshTokens(userId, email);

      res.cookie('access_token', tokens.accessToken, { httpOnly: true });
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при обновлении токенов' });
    }
  }
}
