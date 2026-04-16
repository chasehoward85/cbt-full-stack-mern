import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
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

			const response = await axios.post('/users', { email, password });

			await signInWithEmailAndPassword(getAuth(), email, password);

			const actionCodeSettings = {
				url: `http://localhost:3000/verify/${response.data.verificationCode}`,
				handleCodeInApp: true,
			};

			await sendEmailVerification(getAuth().currentUser, actionCodeSettings).then(() => alert('Email sent!')).catch(e => console.log(e));
		
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