import knex from '@/app/database'

export async function POST(req) {
	const { content, receiverId, senderId } = await req.json();

	const result = await knex('messages')
		.insert({
			content,
			receiver_id: receiverId,
			sender_id: senderId
		})
		.returning('*');

	return Response.json({ data: result });
}