import { Container } from 'inversify';
import type { ConfigService } from '../config/config.service';
import type { UserRepository } from './user.repository';
import type { UserService } from './user.service';
import type { UserModel } from '@prisma/client';
import type { User } from './user.entity';
import { TYPES } from '../types';
import { DefaultUserService } from './default-user.service';

const ConfigServiceMock: ConfigService = {
	get: jest.fn(),
};

const UserRepositoryMock: UserRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: ConfigService;
let userRepository: UserRepository;
let userService: UserService;

beforeAll(() => {
	container.bind<UserService>(TYPES.UserService).to(DefaultUserService).inSingletonScope();
	container.bind<ConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<UserRepository>(TYPES.UserRepository).toConstantValue(UserRepositoryMock);

	userService = container.get<UserService>(TYPES.UserService);
	configService = container.get<ConfigService>(TYPES.ConfigService);
	userRepository = container.get<UserRepository>(TYPES.UserRepository);
});

describe('User Service', () => {
	it('CreateUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		userRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		const createdUser = await userService.createUser({
			email: 'foo@bar.com',
			name: 'Foo Bar',
			password: 'FooBar',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});
});
