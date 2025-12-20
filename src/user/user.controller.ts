import { Request, Response, NextFunction } from 'express';
import { Controller } from '../common/controller';

export interface UserController extends Controller {
	login: (req: Request, res: Response, next: NextFunction) => void | Response;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
}
