import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from './app';
import type { LoggerService } from './logger/logger.service';
import type { ExceptionFilter } from './error/exception.filter';
import { DefaultLoggerService } from './logger/default-logger.service';
import { DefaultExceptionFilter } from './error/default-exception.filter';
import { DefaultUserController } from './user/default-user.controller';
import { UserController } from './user/user.controller';
import { DefaultUserService } from './user/default-user.service';
import { UserService } from './user/user.service';
import { ConfigService } from '../config/config.service';
import { DefaultConfigService } from '../config/default-config.service';

export interface BootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerService>(TYPES.LoggerService).to(DefaultLoggerService).inSingletonScope();
	bind<ExceptionFilter>(TYPES.ExceptionFilter).to(DefaultExceptionFilter).inSingletonScope();
	bind<UserController>(TYPES.UserController).to(DefaultUserController).inSingletonScope();
	bind<UserService>(TYPES.UserService).to(DefaultUserService).inSingletonScope();
	bind<ConfigService>(TYPES.ConfigService).to(DefaultConfigService).inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

function bootstrap(): BootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
