import { userValidationRules } from '../utils/validation/validation.rules';
import { Router, Response, Request } from 'express';
import UserController from '../controllers/user.controller';
import validationErrorHandler from '../utils/validation/validation.error.handler';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/register',
  userValidationRules,
  validationErrorHandler,
  async (req: Request, res: Response) => {
    await userController.createUser(req, res);
  },
);

userRouter.put(
  '/:userId',
  userController.checkUserExists,
  async (req: Request, res: Response) => {
    await userController.updateUser(req, res);
  },
);

userRouter.delete(
  '/delete/:userId',
  userController.checkUserExists,
  async (req: Request, res: Response) => {
    await userController.deleteUser(req, res);
  },
);

userRouter.get(
  '/:userId',
  userController.checkUserExists,
  async (req: Request, res: Response) => {
    await userController.getUser(req, res);
  },
);

export default userRouter;
