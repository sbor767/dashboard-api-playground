import { Request, Response, NextFunction } from 'express';

export interface UserControllerInterface {
	login: (req: Request, res: Response, next: NextFunction) => void | Response;
	register: (req: Request, res: Response, next: NextFunction) => void | Response;
}
