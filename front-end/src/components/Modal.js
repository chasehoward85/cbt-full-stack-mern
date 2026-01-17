export const Modal = ({ isOpen, onRequestClose, children }) => {
	if(!isOpen) {
		return null;
	}

	return (
		<div className="modal-background" onClick={onRequestClose}>
			<div className="modal-body" onClick={e => e.stopPropagation()}>
				<div className="modal-top-bar">
					<div className="modal-close-button">
						<button onClick={onRequestClose}>Close</button>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
