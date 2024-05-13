import { userValidationRules } from '../utils/validation/validation.rules';
import { Router, Response, Request } from 'express';
import { checkUserExists, checkToken } from '../middlewares/user.middleware';
import TokenRepository from '../repositories/user/session.repository';
import UserRepository from '../repositories/user/user.repository';
import UserSessionRepository from '../repositories/user/session.repository';
import UserCredentialsRepository from '../repositories/user/credentials.repository';
import TokenService from '../services/user/user.token.service';
import UserController from '../controllers/user.controller';
import UserCreateService from '../services/user/user.create.service';
import AuthService from '../services/user/user.auth.service';
import validationErrorHandler from '../utils/validation/validation.error.handler';

const userRouter = Router();

const userRepository = new UserRepository();
const userSessionRepository = new UserSessionRepository();
const userCredentialsRepository = new UserCredentialsRepository();
const tokenRepository = new TokenRepository();
const tokenService = new TokenService();
const authService = new AuthService(tokenService, tokenRepository);
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
  userValidationRules,
  validationErrorHandler,
  async (req: Request, res: Response) => {
    await userController.createUser(req, res);
  },
);

userRouter.post('/login', async (req, res) => {
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
  async (req: Request, res: Response) => {
    await userController.updateUser(req, res);
  },
);

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

  async (req: Request, res: Response) => {
    await userController.getUser(req, res);
  },
);

export default userRouter;
