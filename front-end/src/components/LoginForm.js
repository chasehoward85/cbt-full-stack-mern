import { useState } from 'react';

export const LoginForm = ({ onSubmit }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
		<input
			type='email'
			placeholder='john.doe@gmail.com'
			value={email}
			onChange={e => setEmail(e.target.value)} />

		<input
			type='password'
			placeholder='Password'
			value={password}
			onChange={e => setPassword(e.target.value)} />

		<button onClick={() => onSubmit(email, password)}>Log In</button>
		</>
	);
}
