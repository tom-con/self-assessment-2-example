import knex from '@/app/database'
import { pbkdf2Sync } from 'crypto';

export async function POST(req) {
	const { email, password } = await req.json();

	const foundUser = await knex('users')
		.where('email', email)
		.first('*');

	if (!foundUser) {
		return new Response('User not found', { status: 404 });
	}

	const hashedPassword = pbkdf2Sync(password, foundUser.salt, 10000, 64, 'sha512').toString('hex');

	if (hashedPassword !== foundUser.hash) {
		return new Response("Bad login", { status: 400 })
	}

	return Response.json({ data: { id: foundUser.id, email: foundUser.email, name: foundUser.name } });
}