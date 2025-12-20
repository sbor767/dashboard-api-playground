import { Router, Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware';

export interface ControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;
	middlewares?: Middleware[];
}
