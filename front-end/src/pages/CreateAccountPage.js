import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

import { CreateAccountForm } from '../components/CreateAccountForm';

export const CreateAccountPage = () => {
	const [error, setError] = useState('');

	const history = useHistory();

	const createAccount = async (email, password, confirmPassword) => {
		try {
			if(password !== confirmPassword) {
				throw new Error('Passwords do not match');
			}

			const result = await createUserWithEmailAndPassword(getAuth(), email, password);
			await signOut(getAuth());

			const token = await result.user.getIdToken();

			await axios.post('/users', {}, { headers: { authtoken: token }});
		
			history.push('/please-verify');
		} catch(e) {
			setError(e.message);
		}
	}

	return (
		<div className="centered-container">
			<h1 className="h-centered">Create Account</h1>
			<CreateAccountForm error={error} onSubmit={createAccount}/>
			<Link
				style={{ display: 'block' }}
				className="h-centered"
				to="/login"
			>Already have an account? Log In</Link>
		</div>
	);
}