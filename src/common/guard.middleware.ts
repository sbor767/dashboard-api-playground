import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware';

export class GuardMiddleware implements Middleware {
	execute({ user }: Request, res: Response, next: NextFunction): void {
		if (!user) {
			res.status(401).send(new Error('Unauthorized.'));
			return;
		}
		next();
	}
}
