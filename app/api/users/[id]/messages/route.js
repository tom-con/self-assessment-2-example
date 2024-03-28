import knex from '@/app/database';

export async function GET(req, { params }) {
	const { id } = params;
	const { searchParams } = req.nextUrl;
	const receiverId = searchParams.get('receiver_id');

	const messages = await knex('messages')
		.join('users as senders', 'senders.id', 'messages.sender_id')
		.join('users as receivers', 'receivers.id', 'messages.receiver_id')
		.where((qB) => {
			qB.where('receiver_id', receiverId)
				.where('sender_id', id)
		})
		.orWhere((qB) => {
			qB.where('receiver_id', id)
				.where('sender_id', receiverId)
		})
		.orderBy('created_at', 'desc')
		.limit(5)
		.select('messages.*', 'senders.name as sender', 'receivers.name as receiver');



	return Response.json({ data: messages });
}