import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { CreateAccountForm } from '../components/CreateAccountForm';

export const CreateAccountPage = () => {
	const [error, setError] = useState('');

	const history = useHistory();

	const createAccount = async (email, password, confirmPassword) => {
		try {
			if(password !== confirmPassword) {
				throw new Error('Passwords do not match');
			}

			await axios.post('/users', { email, password });
		
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