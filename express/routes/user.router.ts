import { userValidationRules } from '../utils/validation/validation.rules';
import { Router, Response, Request } from 'express';
import { checkUserExists } from '../middlewares/user.middleware';
import UserController from '../controllers/user.controller';
import UserServiceDB from '../services/user/user.service.db';
import UserCreateService from '../services/user/user.create.service';
import validationErrorHandler from '../utils/validation/validation.error.handler';

const userRouter = Router();

const userServiceDB = new UserServiceDB();
const userCreateService = new UserCreateService(userServiceDB);
const userController = new UserController(userCreateService, userServiceDB);

userRouter.post(
  '/register',
  userValidationRules,
  validationErrorHandler,
  async (req: Request, res: Response) => {
    await userController.createUser(req, res);
  },
);

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
  '/:userId',
  checkUserExists,
  async (req: Request, res: Response) => {
    await userController.getUser(req, res);
  },
);

export default userRouter;
