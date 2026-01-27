import { Link } from 'react-router-dom';

import { useUser } from '../hooks/useUser';

import { LogoutButton } from './LogoutButton';

export const NavBar = () => {
	const { isLoading, user } = useUser();

	return (
		<nav>
			<Link className="brand-logo" to="/notes">
				<h1><span className="brand-highlight">NŌT</span>LAB</h1>
			</Link>

			<span className="user-actions">
				{isLoading
					? <p>Loading...</p>
					: user
						? <p>Logged in as: {user.email}</p>
						: null}

				<LogoutButton />
			</span>
		</nav>
	);
}