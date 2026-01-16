import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { NotesPage } from './pages/NotesPage';
import { NotesDetailPage } from './pages/NoteDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

const fakeNotes = [{
	id: '123',
	title: 'My First Note',
	content: '*Hello my dear friends*'
}];

export const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Redirect to="/notes" />
				</Route>
				<Route path="/notes" exact>
					<NotesPage notes={fakeNotes} />
				</Route>
				<Route path="/notes/:noteId">
					<NotesDetailPage notes={fakeNotes} />
				</Route>
				<Route>
					<NotFoundPage />
				</Route>
			</Switch>
		</Router>
	)
}