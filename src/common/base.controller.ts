import { Response, Router } from "express";
import { injectable } from "inversify";
import 'reflect-metadata';
import { LoggerInteface } from "../logger/logger.interface";
import { LoggerService } from "../logger/logger.service";
import { ControllerRoute } from "./route.interface";
export { Router } from 'express';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	
	constructor (private logger: LoggerInteface) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T> (res: Response, code: number, data: T): Response {
		res.type('application/json');
		return res.status(code).json(data);
	}

	public ok<T>(res: Response, data: T): Response {
		return this.send<T>(res, 200, data);
	}

	public created(res: Response): Response {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: ControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`Binding route ${route.method.toUpperCase()} ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}