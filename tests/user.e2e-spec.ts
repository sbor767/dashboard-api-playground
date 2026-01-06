import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;
const TEST_EMAIL = `foo@bar.com`;
const CORRECT_PASSWORD = `FooBar`;
const INCORRECT_PASSWORD = 'incorrect_password';

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const { statusCode } = await request(application.app).post('/users/register').send({
			email: TEST_EMAIL,
			password: CORRECT_PASSWORD,
		});
		expect(statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const { body, statusCode } = await request(application.app).post('/users/login').send({
			email: TEST_EMAIL,
			password: CORRECT_PASSWORD,
		});
		expect(statusCode).toBe(200);
		expect(body?.jwt).not.toBeUndefined;
	});

	it('Login - error', async () => {
		const { statusCode } = await request(application.app).post('/users/login').send({
			email: TEST_EMAIL,
			password: INCORRECT_PASSWORD,
		});
		expect(statusCode).toBe(401);
	});

	it('Get info - success', async () => {
		const {
			body: { jwt },
		} = await request(application.app).post('/users/login').send({
			email: TEST_EMAIL,
			password: CORRECT_PASSWORD,
		});
		const { body, statusCode } = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${jwt}`);
		expect(statusCode).toBe(200);
		expect(body?.email).toBe(TEST_EMAIL);
	});

	it('Get info - error', async () => {
		const { body, statusCode } = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer SomeWrongString`);
		expect(statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
