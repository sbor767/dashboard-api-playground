import express from 'express';
import type { Express } from 'express';
import type { Server } from 'http';
import type { LoggerService } from './logger/logger.service.js';
import type { UserController } from './users/users.controller.js';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService;
	userController: UserController;

	constructor (logger: LoggerService, userController: UserController) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.userController = userController;
	}

	useRoutes()	{
		this.app.use('/users', this.userController.router);	
	}

	public async init() {
		this.useRoutes();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started on http://localhost:${this.port}`);
	}			
}
