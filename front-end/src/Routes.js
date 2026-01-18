import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { NotesPage } from './pages/NotesPage';
import { NotesDetailPage } from './pages/NoteDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Routes = () => {
	return (
		<Router>
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
					<Route>
						<NotFoundPage />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}