import { Container, ContainerModule, interfaces } from 'inversify';
import { TYPES } from './types';
import { App } from './app';
import type { ConfigService } from './config/config.service';
import type { LoggerService } from './logger/logger.service';
import type { ExceptionFilter } from './error/exception.filter';
import type { UserController } from './user/user.controller';
import type { UserService } from './user/user.service';
import type { UserRepository } from './user/user.repository';
import type { PrismaService } from './database/prisma.service';
import { DefaultConfigService } from './config/default-config.service';
import { DefaultLoggerService } from './logger/default-logger.service';
import { DefaultExceptionFilter } from './error/default-exception.filter';
import { DefaultUserController } from './user/default-user.controller';
import { DefaultUserService } from './user/default-user.service';
import { DefaultUserRepository } from './user/default-user.reposotory';
import { DefaultPrismaService } from './database/default-prisma.service';

export interface BootstrapReturn {
	app: App;
	appContainer: Container;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ConfigService>(TYPES.ConfigService).to(DefaultConfigService).inSingletonScope();
	bind<LoggerService>(TYPES.LoggerService).to(DefaultLoggerService).inSingletonScope();
	bind<ExceptionFilter>(TYPES.ExceptionFilter).to(DefaultExceptionFilter).inSingletonScope();
	bind<UserController>(TYPES.UserController).to(DefaultUserController).inSingletonScope();
	bind<UserService>(TYPES.UserService).to(DefaultUserService).inSingletonScope();
	bind<UserRepository>(TYPES.UserRepository).to(DefaultUserRepository).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(DefaultPrismaService).inSingletonScope();
	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

async function bootstrap(): Promise<BootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}

export const boot = bootstrap();
