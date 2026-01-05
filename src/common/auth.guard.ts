import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware';

export class AuthGuard implements Middleware {
	execute({ user }: Request, res: Response, next: NextFunction): void {
		if (!user) {
			res.status(401).send({ error: 'Unathorized - You are not authenticated' });
			return;
		}
		next();
	}
}
