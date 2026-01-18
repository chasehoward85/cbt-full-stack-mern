import styles from './XButton.module.css';

export const XButton = ({ onClick }) => {
	return (
		<div className={styles.circle} onClick={onClick}>
			<span className={styles.theX}>
				×
			</span>
		</div>
	);
}