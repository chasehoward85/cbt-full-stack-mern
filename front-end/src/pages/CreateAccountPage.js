import { Link, useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { CreateAccountForm } from '../components/CreateAccountForm';

export const CreateAccountPage = () => {
	const history = useHistory();

	const createAccount = async (email, password, confirmPassword) => {
		if(password === confirmPassword) {
			await createUserWithEmailAndPassword(getAuth(), email, password);
			history.push('/notes');
		}
	}

	return (
		<div className="centered-container">
			<h1 className="h-centered">Create Account</h1>
			<CreateAccountForm onSubmit={createAccount}/>
			<Link
				style={{ display: 'block' }}
				className="h-centered"
				to="/login"
			>Already have an account? Log In</Link>
		</div>
	);
}