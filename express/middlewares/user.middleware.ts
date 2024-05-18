import { Request, Response, NextFunction } from 'express';
import { validateUserSchema } from '../utils/validation/validation';
import TokenService from '../services/user/user.token.service';
import UserRepository from '../repositories/user/user.repository';

const tokenService = new TokenService();
const userRepository = new UserRepository();

// Миддлвара проверяющая на наличие пользователя
export async function checkUserExists(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const username = req.params.username || null;
    const userId = req.params.userId || null;

    const user = await userRepository.getUser(username, userId);

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

// Миддлвара взаимодействующая с JWT токенами
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
  } catch (error: unknown) {
    res.status(403).json({ error: 'Недействительный access токен' });
  }
}

// Миддлвара для валидации данных JSON
export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    validateUserSchema(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
