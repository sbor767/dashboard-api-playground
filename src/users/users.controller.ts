import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { TYPES } from "../types";
import { BaseController } from "../common/base.controller";
import { LoggerInteface } from "../logger/logger.interface";
import { HTTPError } from "../errors/http-error.class";

@injectable()
export class UserController extends BaseController {
	constructor (@inject(TYPES.LoggerInterface) private loggerService: LoggerInteface) {
		super(loggerService);

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
