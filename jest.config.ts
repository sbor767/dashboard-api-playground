import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
	testPathIgnorePatterns: ['dist/', 'node_modules/'],
};

export default config;
