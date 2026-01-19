import { Link } from 'react-router-dom';

export const NavBar = () => {
	return (
		<nav>
			<Link className="brand-logo" to="/notes">
				<h1><span className="brand-highlight">NŌT</span>LAB</h1>
			</Link>
		</nav>
	);
}