import { inject, injectable } from 'inversify';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { TYPES } from '../types';
import { ConfigService } from '../config/config.service';

@injectable()
export class DefaultUserService implements UserService {
	constructor(@inject(TYPES.ConfigService) private readonly config: ConfigService) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.config.get('SALT');
		await newUser.setPassword(password, Number(salt));
		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
