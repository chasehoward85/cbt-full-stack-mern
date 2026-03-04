import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const VerificationLandingPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);

	const { verificationCode } = useParams();

	useEffect(() => {
		const verify = async () => {
			try {
				await axios.put('/email-verification', { verificationCode });
				
				setIsLoading(false);
				setIsSuccess(true);
			} catch (e) {
				setIsLoading(false);
				setIsSuccess(false);
			}
		}

		verify();
	}, [verificationCode]);

	if(isLoading) {
		return <h1>Loading...</h1>
	}

	if(isSuccess) {
		return (
			<>
			<h1>Success!</h1>
			<p>Your email was successfully verified</p>
			</>
		)
	}

	return (
		<>
		<h1>Hmmm...</h1>
		<p>Something went wrong while trying to verify your email. Please try again</p>
		</>
	)
}
