import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import {
  IUserRepository,
  ITokenService,
  IUserMiddleware,
} from '../../domain/interfaces';
import TYPES from '../../infra/inversify/types';

// TODO: Прикрутить адекватно валидацию (Или в миддлвары не пихать???), отрефакторить всё
@injectable()
export default class UserMiddleware implements IUserMiddleware {
  constructor(
    @inject(TYPES.IUserRepository) private userRepository: IUserRepository,
    @inject(TYPES.ITokenService) private tokenService: ITokenService,
  ) {}

  async checkUserExists(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const username = req.params.username || null;
      const userId = req.params.userId || null;
      const user = await this.userRepository.getUser(username, userId);

      if (!user) {
        res.status(404).json({ error: 'Пользователь не найден' });
      } else {
        next();
      }
    } catch (error: unknown) {
      res
        .status(500)
        .json({ error: 'Ошибка при проверке существования пользователя' });
    }
  }

  async checkToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(' ')?.[1];

    if (!accessToken) {
      return next(res.status(401).json({ error: 'Не авторизован' }));
    }

    try {
      const decodedToken =
        await this.tokenService.verifyAccessToken(accessToken);
      req.user = decodedToken;
      res.cookie('access_token', accessToken, { httpOnly: true });
      next();
    } catch (error: unknown) {
      res.status(403).json({ error: 'Недействительный access токен' });
    }
  }
}
