import { Router, Response, Request } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', async (req: Request, res: Response) => {
  await userController.createUser(req, res);
});

userRouter.put('/:userId', async (req: Request, res: Response) => {
  await userController.updateUser(req, res);
});

userRouter.delete('/delete/:userId', async (req: Request, res: Response) => {
  await userController.deleteUser(req, res);
});

userRouter.get('/:userId', async (req: Request, res: Response) => {
  await userController.getUser(req, res);
});

export default userRouter;
