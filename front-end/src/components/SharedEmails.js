import { useState } from 'react';

import { XButton } from './XButton';

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const SharedEmails = ({ emails, onAdd, onDelete }) => {
	const [newEmail, setNewEmail] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const onClickAdd = () => {
		setErrorMessage('');
		
		if(!newEmail) {
			return setErrorMessage('Please enter a value');
		}

		if(!emailRegex.test(newEmail)) {
			return setErrorMessage('Please enter a valid email address');
		}

		onAdd(newEmail);
		setNewEmail('');
	}

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

		{errorMessage && <p className="error">{errorMessage}</p>}
		<input
			className="full-width space-below"
			type="email"
			placeholder="Enter a new email to share with"
			value={newEmail}
			onChange={e => setNewEmail(e.target.value)} />

		<button
			className="full-width"
			onClick={onClickAdd}
		>Share</button>
		</>
	);
}
