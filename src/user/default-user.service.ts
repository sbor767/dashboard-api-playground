import { inject, injectable } from 'inversify';
import type { UserModel } from '@prisma/client';
import type { ConfigService } from '../config/config.service';
import type { UserRepository } from './user.repository';
import type { UserRegisterDto } from './dto/user-register.dto';
import type { UserLoginDto } from './dto/user-login.dto';
import { TYPES } from '../types';
import { User } from './user.entity';
import { UserService } from './user.service';

@injectable()
export class DefaultUserService implements UserService {
	constructor(
		@inject(TYPES.ConfigService) private readonly config: ConfigService,
		@inject(TYPES.UserRepository) private readonly userRepository: UserRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.config.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		}

		return this.userRepository.create(newUser);
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
