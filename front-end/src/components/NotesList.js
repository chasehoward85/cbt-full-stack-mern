import { XButton } from './XButton';

const getWordCount = str => {
	if(!str) return 0;

	return str.split(' ').length;
}

export const NotesList = ({ notes, onRequestDelete, onClickItem }) => {
	return (
		<>
		{notes.map(notes => (
			<div className="notes-list-item" onClick={() => onClickItem(notes.id)} key={notes.id}>
				<div style={{ flex: 1 }}>
					<h3>{notes.title}</h3>
					<p>{getWordCount(notes.content)} word(s)</p>
				</div>

				{onRequestDelete && <XButton onClick={e => {
					e.stopPropagation();
					onRequestDelete(notes.id);
				}} />}
			</div>
		))}
		</>
	);
}
