import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { useUser } from './hooks/useUser';

import { NotesPage } from './pages/NotesPage';
import { NoteDetailPage } from './pages/NoteDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { LoginPage } from './pages/LoginPage';
import { NoteSharingSettingsPage } from './pages/NoteSharingSettingsPage';
import { PleaseVeirfyEmailPage } from './pages/PleaseVerifyEmailPage';
import { VerificationLandingPage } from './pages/VerificationLandingPage';
import { NotVerifiedPage } from './pages/NotVerifiedPage';
import { NoteDetailPageLinkSharing } from './pages/NoteDetailPageLinkSharing';

import { NavBar } from './components/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';

export const Routes = () => {
	const { user, isLoading } = useUser();
	const isLoggedIn = !!user;
	const isEmailVerified = user && user.emailVerified;

	return (
		<Router>
			<NavBar />
			<div className="content-container">
				<Switch>
					<ProtectedRoute isLoading={isLoading} path="/" exact redirectRules={[
						{ check: isLoggedIn, redirectTo: '/login' },
						{ check: isEmailVerified, redirectTo: '/not-verified' },
					]}>
						<Redirect to="/notes" />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} path="/notes" exact redirectRules={[
						{ check: isLoggedIn, redirectTo: '/login' },
						{ check: isEmailVerified, redirectTo: '/not-verified' },
					]}>
						<NotesPage />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} path="/notes/:noteId" redirectRules={[
						{ check: isLoggedIn, redirectTo: '/login' },
						{ check: isEmailVerified, redirectTo: '/not-verified' },
					]}>
						<NoteDetailPage isOwner />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} path="/shared/:noteId" redirectRules={[
						{ check: isLoggedIn, redirectTo: '/login' },
						{ check: isEmailVerified, redirectTo: '/not-verified' },
					]}>
						<NoteDetailPage />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} path="/sharing-settings/:noteId" redirectRules={[
						{ check: isLoggedIn, redirectTo: '/login' },
						{ check: isEmailVerified, redirectTo: '/not-verified' },
					]}>
						<NoteSharingSettingsPage />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} path="/login" redirectRules={[
						{ check: !isLoggedIn, redirectTo: '/notes' }
					]}>
						<LoginPage />
					</ProtectedRoute>
					<ProtectedRoute isLoading={isLoading} path="/create-account" canAccess={!isLoggedIn} redirectRules={[
						{ check: !isLoggedIn, redirectTo: '/notes' }
					]}>
						<CreateAccountPage />
					</ProtectedRoute>
					<Route path='/link-sharing/:linkSharingHash'>
						<NoteDetailPageLinkSharing />
					</Route>
					<Route path="/please-verify">
						<PleaseVeirfyEmailPage />
					</Route>
					<Route path="/verify/:verificationCode">
						<VerificationLandingPage />
					</Route>
					<Route path="/not-verified">
						<NotVerifiedPage />
					</Route>
					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}
