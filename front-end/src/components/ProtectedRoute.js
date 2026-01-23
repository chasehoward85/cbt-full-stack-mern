import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ canAccess, isLoading, redirectTo, ...props }) => {
	if(isLoading) {
		return <p>Loading...</p>
	}

	if(!canAccess) {
		return <Redirect to={redirectTo} />
	}

	return (
		<Route {...props} />
	)
}
