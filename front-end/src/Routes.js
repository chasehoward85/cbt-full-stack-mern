import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { useUser } from './hooks/useUser';

import { NotesPage } from './pages/NotesPage';
import { NoteDetailPage } from './pages/NoteDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { LoginPage } from './pages/LoginPage';
import { NoteSharingSettingsPage } from './pages/NoteSharingSettingsPage';
import { PleaseVeirfyEmailPage } from './pages/PleaseVerifyEmailPage';

import { NavBar } from './components/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';

export const Routes = () => {
	const { user, isLoading } = useUser();
	const isLoggedIn = !!user;

	return (
		<Router>
			<NavBar />
			<div className="content-container">
				<Switch>
					<ProtectedRoute isLoading={isLoading} canAccess={isLoggedIn} redirectTo="/login" path="/" exact>
						<Redirect to="/notes" />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} canAccess={isLoggedIn} redirectTo="/login" path="/notes" exact>
						<NotesPage />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} canAccess={isLoggedIn} redirectTo="/login" path="/notes/:noteId">
						<NoteDetailPage isOwner />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} canAccess={isLoggedIn} redirectTo="/login" path="/shared/:noteId">
						<NoteDetailPage />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} canAccess={isLoggedIn} redirectTo="/login" path="/sharing-settings/:noteId">
						<NoteSharingSettingsPage />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} canAccess={!isLoggedIn} redirectTo="/notes" path="/login">
						<LoginPage />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} canAccess={!isLoggedIn} redirectTo="/notes" path="/create-account">
						<CreateAccountPage />
					</ProtectedRoute>
					<Route path="/please-verify">
						<PleaseVeirfyEmailPage />
					</Route>
					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}