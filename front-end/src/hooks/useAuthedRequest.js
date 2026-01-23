import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { useUser } from './useUser';

export const useAuthedRequest = () => {
	const { user } = useUser();

	const [token, setToken] = useState(null);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const createToken = async () => {
			const token = await user.getIdToken();

			setToken(token);
			setIsReady(true);
		}

		if(user) {
			createToken();
		}
	}, [user]);

	const get = useCallback(async (url) => {
		const response = await axios.get(url, { headers: { authtoken: token }});

		return response.data;
	}, [token]);

	const post = useCallback(async (url, body) => {
		const response = await axios.post(url, body, { headers: { authtoken: token }});

		return response.data;
	}, [token]);

	const put = useCallback(async (url, body) => {
		const response = await axios.put(url, body, { headers: { authtoken: token }});

		return response.data;
	}, [token]);

	const del = useCallback(async (url) => {
		const response = await axios.delete(url, { headers: { authtoken: token }});

		return response.data;
	}, [token]);

	return {
		isReady,
		get,
		post,
		put,
		del,
	}
}
