import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useUser = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const cancelSubscription = onAuthStateChanged(getAuth(), user => {
			setUser(user);
			setIsLoading(false);
		});

		return cancelSubscription;
	}, []);

	return { user, isLoading }
}