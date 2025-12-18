import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { DefaultController } from '../common/default.controller';
import { LoggerService } from '../logger/logger.service';
import { HTTPError } from '../error/http-error.class';
import { UserController } from './user.controller';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';

@injectable()
export class DefaultUserController extends DefaultController implements UserController {
	constructor(@inject(TYPES.LoggerInterface) private loggerService: LoggerService) {
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
