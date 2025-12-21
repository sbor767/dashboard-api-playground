import { PrismaClient } from '@prisma/client';

export interface PrismaService {
	client: PrismaClient;

	connect: () => Promise<void>;
	disconnect: () => Promise<void>;
}
