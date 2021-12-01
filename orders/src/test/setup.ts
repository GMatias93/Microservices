import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
	var signIn: () => string[];
}

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';

	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri);
});

beforeEach(async () => {
	jest.clearAllMocks();
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongo.stop();
	await mongoose.connection.close();
});

global.signIn = () => {
	const token = jwt.sign(
		{
			id: new mongoose.Types.ObjectId().toHexString(),
			email: 'test@test.com',
		},
		process.env.JWT_KEY!
	);

	const sessionJSON = JSON.stringify({ jwt: token });

	const base64 = Buffer.from(sessionJSON).toString('base64');

	return [`express:sess=${base64}`];
};
