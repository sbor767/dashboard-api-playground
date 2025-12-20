import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Invalid email address' })
	@IsNotEmpty({ message: 'Email is required' })
	email: string;

	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty({ message: 'Password is required' })
	password: string;

	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	name: string;
}
