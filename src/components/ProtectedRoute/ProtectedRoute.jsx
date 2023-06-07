import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import { useAppSelector } from "../../redux/hooks";
import PropTypes from "prop-types";

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

/**
 * @param {import("react-router-dom").RouteProps} props
 * @returns {React.JSX.Element}
 */
function ProtectedRoute({ children, ...props }) {
	const user = useAppSelector((store) => store.user);

	// We return a Route component that gets added to our list of routes
	return (
		<Route
			// all props like 'exact' and 'path' that were passed in
			// are now passed along to the 'Route' Component
			{...props}
		>
			{user.tag === "Some" ? (
				// If the user is logged in, show the protected component
				children
			) : (
				// Otherwise, redirect to the Loginpage
				<LoginPage />
			)}
		</Route>
	);
}

ProtectedRoute.propTypes = {
	children: PropTypes.object,
};

export default ProtectedRoute;
