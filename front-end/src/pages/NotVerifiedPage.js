import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';

export const NotVerifiedPage = () => {
	const history = useHistory();

	useEffect(() => {
		setTimeout(() => {
			signOut(getAuth());
			history.push('/login');
		}, 3500);
	}, [history]);

	return (
		<>
		<h1>You need to verify your email first!</h1>
		<p>We sent a verification code to your email address. Please open the email and click on it to verify your email to use the app</p>
		</>
	)
}
