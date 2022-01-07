import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../app';

declare global {
	var signIn: () => string[];
}

let mongo: any;
beforeAll(async () => {
	process.env.JWT_KEY = 'asdf';
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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
	// Build a JWT payload.  { id, email }
	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: 'test@test.com',
	};

	// Create the JWT!
	const token = jwt.sign(payload, process.env.JWT_KEY!);

	// Build session Object. { jwt: MY_JWT }
	const sessionJSON = JSON.stringify({ jwt: token });

	// Turn that session into JSON
	const base64 = Buffer.from(sessionJSON).toString('base64');

	// return a string thats the cookie with the encoded data
	return [`express:sess=${base64}`];
};
