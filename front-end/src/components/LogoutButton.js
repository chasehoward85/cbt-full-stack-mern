import { getAuth, signOut } from 'firebase/auth';

export const LogoutButton = () => {
	const logOut = async () => {
		await signOut(getAuth());
	}

	return (
		<button onClick={logOut}>Log Out</button>
	);
}
