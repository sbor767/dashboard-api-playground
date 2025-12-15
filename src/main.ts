import { Container, ContainerModule, interfaces } from "inversify";
import { TYPES } from "./types";
import { App } from "./app";
import type { LoggerInteface } from "./logger/logger.interface";
import type { ExceptionFilterInterface } from "./errors/exception.filter.interface";
import { LoggerService } from "./logger/logger.service";
import { ExceptionFilter } from "./errors/exception.filter";
import { UserController } from "./users/users.controller";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerInteface>(TYPES.LoggerInterface).to(LoggerService);
	bind<ExceptionFilterInterface>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
} 


export const { app, appContainer } = bootstrap();
