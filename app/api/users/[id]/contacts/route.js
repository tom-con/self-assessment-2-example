import knex from '@/app/database'

export async function GET(req, { params }) {
	const { id } = params;

	const results = await knex('messages')
		.join('users as senders', 'senders.id', 'messages.sender_id')
		.join('users as receivers', 'receivers.id', 'messages.receiver_id')
		.distinctOn(knex.raw('least(sender_id, receiver_id)'), knex.raw('greatest(sender_id, receiver_id)'))
		.where('receiver_id', id)
		.orWhere('sender_id', id)
		.orderByRaw('least(sender_id, receiver_id), greatest(sender_id, receiver_id), created_at DESC')
		.select('messages.*', 'senders.name as sender', 'receivers.name as receiver');

	return Response.json({ data: results });
}