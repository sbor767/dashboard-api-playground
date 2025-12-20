import { Response, Router } from 'express';

export interface Controller {
	router: Router;

	send<T>(res: Response, code: number, data: T): Response;

	ok<T>(res: Response, data: T): Response;

	created(res: Response): Response;
}
