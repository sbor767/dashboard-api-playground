import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";

export class UserController extends BaseController {

	constructor (logger: LoggerService) {
		super(logger);

		this.bindRoutes([
			{
				path: '/login',
				func: (_, res) => this.ok(res, '/login'),
				method: 'post',
			},
			{
				path: '/register',
				func: (_, res) => this.ok(res, '/register'),
				method: 'post',
			},
		]);
	}
}
