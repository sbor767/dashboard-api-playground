import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	testRegex: '.e2e-spec.ts$',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};

export default config;
