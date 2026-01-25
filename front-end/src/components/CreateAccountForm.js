import { useState } from 'react';

const errorMessageMap = {
	'Firebase: Error (auth/invalid-email).': 'Please enter a valid email',
	'Firebase: Error (auth/missing-password).': 'Please enter a password',
	'Firebase: Error (auth/internal-error)': 'Something went wrong. Please try again',
	'Passwords do not match': 'Passwords do not match',
	'Firebase: Password should be at least 6 characters (auth/weak-password).': 'Your password must be at least 6 characters long',
	'Firebase: Error (auth/email-already-in-use).': 'This email is already in use',
}

export const CreateAccountForm = ({ error, onSubmit }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	return (
		<>
		{error && <p className="error">{errorMessageMap[error] || error}</p>}

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
