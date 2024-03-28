"use client";

import { useEffect, useState } from "react";

import { formatDistance } from "date-fns"

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Home() {
	const [contacts, setContacts] = useState([])
	const [conversation, setConversation] = useState([])
	const [message, setMessage] = useState('')
	const [receiverId, setReceiverId] = useState(null)
	const myUserId = 1;

	async function getContacts() {
		const response = await fetch(`/api/users/${myUserId}/contacts`);
		const { data } = await response.json();
		const contacts = data.map((contact) => {
			if (contact.sender_id === myUserId) {
				return {
					id: contact.receiver_id,
					message: contact.content,
					name: contact.receiver,
				}
			} else {
				return {
					id: contact.sender_id,
					message: contact.content,
					name: contact.sender,
				}
			}
		})
		setContacts(contacts)
	}

	async function getMessages() {
		const response = await fetch(`/api/users/${myUserId}/messages?receiver_id=${receiverId}`);
		const { data } = await response.json();
		setConversation(data)
	}

	async function sendMessage(content) {
		const response = await fetch(`/api/messages`, {
			method: 'POST',
			body: JSON.stringify({ senderId: myUserId, receiverId, content })
		})
		await getMessages();
		setMessage("")
	}

	useEffect(() => {
		getMessages();
		setMessage("")
	}, [receiverId])

	return (
		<main className="flex w-2/3 mx-auto min-h-screen divide-x-2 divide-white items-center justify-between p-24">
			<div className="flex flex-col w-1/2 divide-y-2 divide-gray-600">
				<button onClick={() => getContacts()}>Click me </button>
				{contacts.map((contact) => (
					<button
						className="py-2"
						key={contact.id}
						onClick={() => setReceiverId(contact.id)}
					>
						<p className="font-bold">{contact.name}</p>
						<p className="text-sm text-gray-400">{contact.message}</p>
					</button>
				))}
			</div>
			<div className="pl-4 w-1/2">
				<div className="flex flex-col-reverse">
					{!conversation.length ? (
						<div className="flex justify-center items-center h-64">
							<p className="text-gray-400">No messages</p>
						</div>
					) : (
						<div className="flex justify-between">
							<input
								className="bg-white text-black rounded-full px-4 py-2"
								type="text"
								onChange={(event) => setMessage(event.target.value)}
								placeholder="Type a message..."
								value={message}
							/>
							<button
								className="bg-blue-500 rounded-full px-4 py-2"
								onClick={() => sendMessage(message)}
							>
								Send
							</button>
						</div>
					)}
					{conversation.map((message) => {
						const isMe = message.sender_id === myUserId;
						const name = isMe ? "You" : message.sender
						return (
							<div key={message.id} className="flex flex-col my-2">
								<div className="flex justify-between">
									<p className={isMe ? "w-full text-right" : "w-full text-left"}>{name}</p>
								</div>
								<p className={classNames("rounded-full py-2 px-4", isMe ? "bg-blue-500" : "bg-gray-300 text-black")}>{message.content}</p>
								<p className="text-xs text-right">{formatDistance(new Date(message.created_at), new Date())} ago</p>
							</div>
						);
					})}

				</div>
			</div>
		</main>
	);
}
