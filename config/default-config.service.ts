import { inject, injectable } from 'inversify';
import { LoggerService } from '../src/logger/logger.service';
import { TYPES } from '../src/types';
import type { ConfigService } from './config.service';
import { config, DotenvConfigOutput, DotenvParseOptions, DotenvParseOutput } from 'dotenv';

@injectable()
export class DefaultConfigService implements ConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.LoggerService) private readonly logger: LoggerService) {
		const parsed: DotenvConfigOutput = config();
		if (parsed.error) {
			this.logger.error('[DefaultConfigService] The .env file is either unreadable or missing');
		}
		this.logger.log('[DefaultConfigService] .env file successfully read');
		this.config = parsed as DotenvParseOutput;
	}

	get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
