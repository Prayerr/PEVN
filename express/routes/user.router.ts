import { Router, Response, Request } from 'express';
import {
  checkUserExists,
  checkToken,
  validateUser,
} from '../middlewares/user.middleware';
import UserController from '../controllers/user.controller';
import UserRepository from '../repositories/user/user.repository';
import UserSessionRepository from '../repositories/user/session.repository';
import UserCredentialsRepository from '../repositories/user/credentials.repository';
import TokenService from '../services/user/user.token.service';
import UserCreateService from '../services/user/user.create.service';
import AuthService from '../services/user/user.auth.service';

const userRouter = Router();

const userRepository = new UserRepository();
const userSessionRepository = new UserSessionRepository();
const userCredentialsRepository = new UserCredentialsRepository();
const tokenService = new TokenService();
const authService = new AuthService(tokenService, userSessionRepository);
const userCreateService = new UserCreateService(
  tokenService,
  userSessionRepository,
  userCredentialsRepository,
  userRepository,
);

const userController = new UserController(
  userCreateService,
  userRepository,
  authService,
  userCredentialsRepository,
);

userRouter.post(
  '/register',
  validateUser,
  async (req: Request, res: Response) => {
    await userController.createUser(req, res);
  },
);

userRouter.post('/login', async (req: Request, res: Response) => {
  await userController.loginUser(req, res);
});

userRouter.post('/logout', async (req: Request, res: Response) => {
  await userController.logoutUser(req, res);
});

userRouter.post('/refresh', checkToken, async (req: Request, res: Response) => {
  await userController.refreshTokens(req, res);
});

userRouter.put(
  '/:userId/update',
  checkUserExists,
  validateUser,
  async (req: Request, res: Response) => {
    await userController.updateUser(req, res);
  },
);

// TODO: Проработать логику того чтобы пользователь не смог удалить чужой профиль
userRouter.delete(
  '/:userId/delete',
  checkUserExists,
  async (req: Request, res: Response) => {
    await userController.deleteUser(req, res);
  },
);

userRouter.get(
  '/:username',
  checkUserExists,
  checkToken,
  async (req: Request, res: Response) => {
    await userController.getUser(req, res);
  },
);

export default userRouter;
