import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { BaseController } from '../common/base.controller';
import { LoggerInteface } from '../logger/logger.interface';
import { HTTPError } from '../errors/http-error.class';
import { UserControllerInterface } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

@injectable()
export class UserController extends BaseController implements UserControllerInterface {
	constructor(@inject(TYPES.LoggerInterface) private loggerService: LoggerInteface) {
		super(loggerService);

		this.bindRoutes([
			{ path: '/login', func: this.login, method: 'post' },
			{ path: '/register', func: this.register, method: 'post' },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'Not authorized', 'UserController/login'));
	}

	register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction): void {
		const newUser = new User(body.email, body.name);
		newUser.setPassword(body.password).then(() => {
			this.ok(res, newUser);
		});
	}
}
