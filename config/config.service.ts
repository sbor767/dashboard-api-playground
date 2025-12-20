export interface ConfigService {
	get: <T extends string | number>(key: string) => T;
}
