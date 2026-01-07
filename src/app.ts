import express from 'express';
import type { Express } from 'express';
import type { Server } from 'http';
import { inject } from 'inversify';
import 'reflect-metadata';
import { json } from 'body-parser';
import { TYPES } from './types';
import type { LoggerService } from './logger/logger.service.js';
import type { ConfigService } from './config/config.service';
import type { ExceptionFilter } from './error/exception.filter';
import type { UserController } from './user/user.controller';
import type { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private logger: LoggerService,
		@inject(TYPES.ConfigService) private configService: ConfigService,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
		@inject(TYPES.PrismaService) private readonly prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddlewares(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
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
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started on http://localhost:${this.port}`);
	}

	public close(): void {
		void this.prismaService.disconnect();
		this.server.close();
	}
}
