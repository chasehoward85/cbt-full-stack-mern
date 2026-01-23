import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { NotesPage } from './pages/NotesPage';
import { NotesDetailPage } from './pages/NoteDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { LoginPage } from './pages/LoginPage';

import { NavBar } from './components/NavBar';

export const Routes = () => {
	return (
		<Router>
			<NavBar />
			<div className="content-container">
				<Switch>
					<Route path="/" exact>
						<Redirect to="/notes" />
					</Route>
					<Route path="/notes" exact>
						<NotesPage />
					</Route>
					<Route path="/notes/:noteId">
						<NotesDetailPage />
					</Route>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/create-account">
						<CreateAccountPage />
					</Route>
					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}