import { Request, Response, NextFunction } from 'express';

export interface IUserMiddleware {
  checkUserExists(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  checkToken(req: Request, res: Response, next: NextFunction): Promise<void>;
}
