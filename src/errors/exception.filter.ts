import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { LoggerInteface } from '../logger/logger.interface';
import type { ExceptionFilterInterface } from './exception.filter.interface';
import { HTTPError } from './http-error.class';

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
	constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInteface) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(
				`[${err.context}] HTTP Error occurred: '${req.path}' ${err.statusCode} - ${err.message}`,
			);
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
