import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { inject, injectable } from 'inversify';
import { PrismaService } from './prisma.service';
import { TYPES } from '../types';
import { LoggerService } from '../logger/logger.service';

@injectable()
export class DefaultPrismaService implements PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.LoggerService) private readonly logger: LoggerService) {
		const adapter = new PrismaLibSql({
			url: process.env.DATABASE_URL ?? 'file:./prisma/dev.db',
		});

		this.client = new PrismaClient({ adapter });
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[DefaultPrismaService] Connected to the database');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(`[DefaultPrismaService] Failed to connect to the database: ${e.message}`);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
