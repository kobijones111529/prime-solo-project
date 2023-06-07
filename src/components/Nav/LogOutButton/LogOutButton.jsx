import * as React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/sagas/login";
import PropTypes from "prop-types";

/**
 * @typedef Props
 * @property {string} className
 */

/**
 * @param {Props} props
 * @returns {React.JSX.Element}
 */
function LogOutButton({ className }) {
	const dispatch = useDispatch();
	return (
		<button
			// This button shows up in multiple locations and is styled differently
			// because it's styled differently depending on where it is used, the className
			// is passed to it from it's parents through React props
			className={className}
			onClick={() => dispatch(logout())}
		>
			Log Out
		</button>
	);
}

LogOutButton.propTypes = {
	className: PropTypes.string.isRequired,
};

export default LogOutButton;
