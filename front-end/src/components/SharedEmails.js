import { useState } from 'react';

import { XButton } from './XButton';

// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const VIEW = 'view';
const EDIT = 'edit'

export const SharedEmails = ({ sharingSettings, onAdd, onDelete }) => {
	const [newEmail, setNewEmail] = useState('');
	const [selectedPermission, setSelectedPermission] = useState(VIEW);

	return (
		<>
		<div className="space-below">
			{sharingSettings.map(({ email, role }) => (
				<div className="shared-email-item">
					<h3>{email}</h3>
					<p>{role}</p>
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

		<div>
			Permission Level:
			
			<div>
				<label>
					<input
						type="radio"
						value={VIEW}
						checked={selectedPermission === VIEW}
						onChange={() => setSelectedPermission(VIEW)} />

					Can View
				</label>
			</div>
			<div>
				<label>
					<input
						type="radio"
						value={EDIT}
						checked={selectedPermission === EDIT}
						onChange={() => setSelectedPermission(EDIT)} />
						
					Can Edit
				</label>
			</div>
		</div>

		<button
			className="full-width"
			onClick={() => {
				onAdd({ email: newEmail, role: selectedPermission });
				setNewEmail('');
			}}
		>Share</button>
		</>
	);
}
