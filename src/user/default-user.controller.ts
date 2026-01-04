import type { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import type { LoggerService } from '../logger/logger.service';
import type { ConfigService } from '../config/config.service';
import type { UserController } from './user.controller';
import type { UserService } from './user.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { HTTPError } from '../error/http-error.class';
import { DefaultController } from '../common/default.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { GuardMiddleware } from '../common/guard.middleware';

@injectable()
export class DefaultUserController extends DefaultController implements UserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: LoggerService,
		@inject(TYPES.UserService) private userService: UserService,
		@inject(TYPES.ConfigService) private config: ConfigService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/register',
				func: this.register,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				func: this.login,
				method: 'post',
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				func: this.info,
				method: 'get',
				middlewares: [new GuardMiddleware()],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const validated = await this.userService.validateUser(body);
		if (!validated) {
			return next(new HTTPError(401, 'Not authorized', 'UserController/login'));
		}
		const secret = this.config.get('SECRET');
		const jwt = await this.signJWT(body.email, secret);
		this.ok(res, { jwt });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'User already exists', 'UserController/register'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, { email: user });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
