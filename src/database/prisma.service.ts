export interface PrismaService {
	connect: () => Promise<void>;
	disconnect: () => Promise<void>;
}
