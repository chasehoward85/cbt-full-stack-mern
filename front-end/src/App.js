import { Routes } from './Routes';

import { NotesProvider } from './providers/NotesProvider';

import './App.css';

export const App = () => {
	return (
		<NotesProvider>
			<Routes />
		</NotesProvider>
	);
}
