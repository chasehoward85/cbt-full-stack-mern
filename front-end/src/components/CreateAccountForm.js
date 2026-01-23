import { useState } from 'react';

export const CreateAccountForm = ({ onSubmit }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	return (
		<>
		<input
			className="full-width space-below"
			type="email"
			placeholder="john.doe@gmail.com"
			value={email}
			onChange={e => setEmail(e.target.value)} />

		<input
			className="full-width space-below"
			type="password"
			placeholder="Password"
			value={password}
			onChange={e => setPassword(e.target.value)} />

		<input
			className="full-width space-below"
			type="password"
			placeholder="Re-Enter Your Password"
			value={confirmPassword}
			onChange={e => setConfirmPassword(e.target.value)} />

		<button className="full-width space-below" onClick={() => onSubmit(email, password, confirmPassword)}>Create Account</button>
		</>
	);
}
