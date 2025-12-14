import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController {

	constructor (logger: LoggerService) {
		super(logger);

		this.bindRoutes([
			{ path: '/login', func: this.login, method: 'post'},
			{ path: '/register', func: this.register, method: 'post' },
		]);
	}

	private login (_: Request, res: Response, next: NextFunction): Response {
		return this.ok(res, '/login');
	}

	private register (_: Request, res: Response, next: NextFunction): Response {
		return this.ok(res, '/register');
	}
}
