import { useState } from 'react';

import { XButton } from './XButton';

export const SharedEmails = ({ emails, onAdd, onDelete }) => {
	const [newEmail, setNewEmail] = useState('');

	return (
		<>
		<div className="space-below">
			{emails.map(email => (
				<div className="shared-email-item">
					<h3>{email}</h3>
					<XButton onClick={() => onDelete(email)} />
				</div>
			))}
		</div>

		<input
			className="full-width space-below"
			type="email"
			placeholder="Enter a new email to share with"
			value={newEmail}
			onChange={e => setNewEmail(e.target.value)} />

		<button
			className="full-width"
			onClick={() => {
				onAdd(newEmail);
				setNewEmail('')
			}}
		>Share</button>
		</>
	);
}
