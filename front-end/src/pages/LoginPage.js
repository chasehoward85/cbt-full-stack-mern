import { Link, useHistory } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
	const history = useHistory();

	const logIn = (email, password) => {
		alert('Logging in');
		history.push('/notes');
	}

	return (
		<div className="centered-container">
			<h1>Log In</h1>
			<LoginForm onSubmit={logIn}/>
			<Link to="/create-account">Create Account</Link>
		</div>
	);
}