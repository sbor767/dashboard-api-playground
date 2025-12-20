import { Request, Response, NextFunction } from 'express';

export interface UserController {
	login: (req: Request, res: Response, next: NextFunction) => void | Response;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>;
}
