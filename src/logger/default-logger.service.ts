import { Logger } from 'tslog';
import { injectable } from 'inversify';
import 'reflect-metadata';
import type { LoggerService } from './logger.service';

@injectable()
export class DefaultLoggerService implements LoggerService {
	private logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
