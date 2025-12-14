import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { HTTPError } from "../errors/http-error.class";

export class UserController extends BaseController {

	constructor (logger: LoggerService) {
		super(logger);

		this.bindRoutes([
			{ path: '/login', func: this.login, method: 'post'},
			{ path: '/register', func: this.register, method: 'post' },
		]);
	}

	private login (_: Request, res: Response, next: NextFunction): void {
		// return this.ok(res, '/login');
		next(new HTTPError(401, 'Not authorized', 'UserController/login'));
	}

	private register (_: Request, res: Response, next: NextFunction): Response {
		return this.ok(res, '/register');
	}
}
