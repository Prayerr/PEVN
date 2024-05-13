import { Request, Response, NextFunction } from 'express';
import TokenService from '../services/user/user.token.service';
import UserRepository from '../repositories/user/user.repository';

const tokenService = new TokenService();
const userRepository = new UserRepository();

export async function checkUserExists(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const username = req.params.username;
    const user = await userRepository.getUser(username);

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

export async function checkToken(
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
    const decodedToken = await tokenService.verifyAccessToken(accessToken);
    req.user = decodedToken;

    res.cookie('access_token', accessToken, { httpOnly: true });
    next();
  } catch (error) {
    res.status(403).json({ error: 'Недействительный access токен' });
  }
}
