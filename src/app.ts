import express from 'express';
import type { Express } from 'express';
import type { Server } from 'http';
import { inject } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import type { UserController } from './user/user.controller.js';
import type { ExceptionFilter } from './errors/exception.filter.js';
import type { LoggerInteface } from './logger/logger.interface.js';
import { json } from 'body-parser';

export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.LoggerInterface) private logger: LoggerInteface,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddlewares(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddlewares();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started on http://localhost:${this.port}`);
	}
}
