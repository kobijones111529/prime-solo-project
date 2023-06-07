import { useEffect } from "react";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

/**
 * @typedef Props
 * @property {[number, number]} center
 * @property {number} [zoom]
 */

/**
 * @param {Props} props
 * @returns {null}
 */
function TrackCenter(props) {
	const map = useMap();

	useEffect(() => {
		map.setView(props.center, props.zoom);
	}, [props.center, props.zoom]);

	return null;
}

TrackCenter.propTypes = {
	center: PropTypes.object.isRequired,
	zoom: PropTypes.number.isRequired,
};

export default TrackCenter;
