export const ErrorPage = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const message = queryParams.get('message');

	return (
		<div>
			<h1>Uh oh! An error occured</h1>
			<p className="error">ERROR: {message}</p>
		</div>
	);
}
