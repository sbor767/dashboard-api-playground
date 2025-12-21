import { inject, injectable } from 'inversify';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import type { ConfigService } from './config.service';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';

@injectable()
export class DefaultConfigService implements ConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.LoggerService) private readonly logger: LoggerService) {
		const { parsed, error }: DotenvConfigOutput = config();
		if (error) {
			this.logger.error('[DefaultConfigService] The .env file is either unreadable or missing');
		}
		this.logger.log('[DefaultConfigService] .env file successfully read');
		this.config = parsed as DotenvParseOutput;
	}

	get(key: string): string {
		return this.config[key];
	}
}
