import type { NextFunction, Request, Response } from "express";
import type { LoggerService } from "../logger/logger.service";
import type { ExceptionFilterInterface } from "./exception.filter.interface";
import { HTTPError } from "./http-error.class";

export class ExceptionFilter implements ExceptionFilterInterface {
	logger: LoggerService;
	
	constructor(logger: LoggerService) {
		this.logger = logger;
	}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] HTTP Error occurred: '${req.path}' ${err.statusCode} - ${err.message}`);
			res.status(err.statusCode).send({ error: err.message });
			return;
		} else {
			this.logger.error(`Non-HTTP Error occurred: ${err.message}`);
			res.status(500).send({ error: err.message });
		}

		this.logger.error(`Error occurred: ${err.message}`);
		res.status(500).send({ error: err.message });
	}
}
