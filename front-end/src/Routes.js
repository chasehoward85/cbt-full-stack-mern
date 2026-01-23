import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { NotesPage } from './pages/NotesPage';
import { NotesDetailPage } from './pages/NoteDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { LoginPage } from './pages/LoginPage';

import { NavBar } from './components/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';

export const Routes = () => {
	const isLoggedIn = false;

	return (
		<Router>
			<NavBar />
			<div className="content-container">
				<Switch>
					<ProtectedRoute canAccess={isLoggedIn} redirectTo="/login" path="/" exact>
						<Redirect to="/notes" />
					</ProtectedRoute>
					<ProtectedRoute canAccess={isLoggedIn} redirectTo="/login" path="/notes" exact>
						<NotesPage />
					</ProtectedRoute>
					<ProtectedRoute canAccess={isLoggedIn} redirectTo="/login" path="/notes/:noteId">
						<NotesDetailPage />
					</ProtectedRoute>
					<ProtectedRoute canAccess={!isLoggedIn} redirectTo="/notes" path="/login">
						<LoginPage />
					</ProtectedRoute>
					<ProtectedRoute canAccess={!isLoggedIn} redirectTo="/notes" path="/create-account">
						<CreateAccountPage />
					</ProtectedRoute>
					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}