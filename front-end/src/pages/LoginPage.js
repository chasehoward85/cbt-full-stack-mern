import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
	const [error, setError] = useState('');
	const history = useHistory();

	const logIn = async (email, password) => {
		try {
			await signInWithEmailAndPassword(getAuth(), email, password);
			history.push('/notes');
		} catch(e) {
			setError(e.message);
		}
	}

	return (
		<div className="centered-container">
			<h1 className="h-centered">Log In</h1>
			<LoginForm error={error} onSubmit={logIn}/>
			<Link
				style={{ display: 'block' }}
				className="h-centered"
				to="/create-account"
			>Create Account</Link>
		</div>
	);
}