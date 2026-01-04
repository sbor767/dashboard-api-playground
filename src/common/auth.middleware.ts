import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements Middleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		const authorizationHeader = req.headers.authorization;
		if (authorizationHeader) {
			const token = authorizationHeader.split(' ')[1];
			verify(token, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && typeof payload !== 'string') {
					req.user = payload.email;
					next();
				}
			});
		}
		next();
	}
}
