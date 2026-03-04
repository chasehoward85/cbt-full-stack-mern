import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ isLoading, redirectRules = [], ...props }) => {
	if(isLoading) {
		return <p>Loading...</p>
	}

	const matchingRule = redirectRules.find(rule => !rule.check);

	if(matchingRule) {
		return <Redirect to={matchingRule.redirectTo} />
	}

	return (
		<Route {...props} />
	)
}
