import { Container } from "inversify";
import { TYPES } from "./types";
import { App } from "./app";
import type { LoggerInteface } from "./logger/logger.interface";
import type { ExceptionFilterInterface } from "./errors/exception.filter.interface";
import { LoggerService } from "./logger/logger.service";
import { ExceptionFilter } from "./errors/exception.filter";
import { UserController } from "./users/users.controller";

const appContainer = new Container();
appContainer.bind<LoggerInteface>(TYPES.LoggerInterface).to(LoggerService);
appContainer.bind<ExceptionFilterInterface>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);
const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer }
