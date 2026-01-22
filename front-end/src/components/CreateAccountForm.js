import { useState } from 'react';

export const CreateAccountForm = ({ }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	return (
		<>
		<input
			type="email"
			placeholder="john.doe@gmail.com"
			value={email}
			onChange={e => setEmail(e.target.value)} />

		<input
			type="password"
			placeholder="Password"
			value={password}
			onChange={e => setPassword(e.target.value)} />

		<input
			type="password"
			placeholder="Re-Enter Your Password"
			value={password}
			onChange={e => setPassword(e.target.value)} />

		<button onClick={() => onSubmit(email, password, confirmPassword)}>Create Account</button>
		</>
	);
}
