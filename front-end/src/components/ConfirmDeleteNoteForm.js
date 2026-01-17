export const ConfirmDeleteNoteForm = ({ onConfirm, onDeny }) => {
	return (
		<>
		<h3>Delete Note</h3>
		<p>Are you sure you want to delete this note?</p>

		<button onClick={onConfirm}>Yes</button>
		<button onClick={onDeny}>No</button>
		</>
	);
}