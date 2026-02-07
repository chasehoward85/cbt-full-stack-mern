import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const PleaseVeirfyEmailPage = () => {
	const history = useHistory();

	useEffect(() => {
		setTimeout(() => {
			history.push('/login');
		}, 3500);
	}, [history]);

	return (
		<>
		<h1>Thanks for Signing Up!</h1>
		<p>We just sent a verification code to your email address. Please open the email and click on it to verify your email to use the app</p>
		</>
	)
}
