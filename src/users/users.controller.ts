import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { BaseController } from '../common/base.controller';
import { LoggerInteface } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import { UserControllerInterface } from './users.controller.interface';

@injectable()
export class UserController extends BaseController implements UserControllerInterface {
	constructor(@inject(TYPES.LoggerInterface) private loggerService: LoggerInteface) {
		super(loggerService);

		this.bindRoutes([
			{ path: '/login', func: this.login, method: 'post' },
			{ path: '/register', func: this.register, method: 'post' },
		]);
	}

	login(_: Request, res: Response, next: NextFunction): void {
		// return this.ok(res, '/login');
		next(new HTTPError(401, 'Not authorized', 'UserController/login'));
	}

	register(_: Request, res: Response, next: NextFunction): Response {
		return this.ok(res, '/register');
	}
}
