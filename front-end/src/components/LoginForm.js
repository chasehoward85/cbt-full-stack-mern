import { useState } from 'react';

const errorMessageMap = {
	'Firebase: Error (auth/invalid-email).': 'Please enter a valid email',
	'Firebase: Error (auth/invalid-credential).': 'Invalid email or password',
	'Firebase: Error (auth/user-not-found).': 'An account does not exist with that email',
	'Firebaes: Error (auth/wrong-password).': 'Incorrect password',
}

export const LoginForm = ({ error, onSubmit }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
		{error && <p className="error">{errorMessageMap[error] || 'An error occurred'}</p>}
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

		<button className="full-width space-below" onClick={() => onSubmit(email, password)}>Log In</button>
		</>
	);
}
