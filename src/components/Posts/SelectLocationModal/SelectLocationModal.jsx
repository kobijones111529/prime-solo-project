import { rootSelector } from "constants/index";
import React, { useRef, useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMapEvents,
} from "react-leaflet";
import ReactModal from "react-modal";
import styles from "./SelectLocationModal.module.css";
import leafletDefaults from "../../../styles/leaflet-defaults.module.css";
import PropTypes from "prop-types";

ReactModal.setAppElement(rootSelector);

/**
 * @typedef {import('leaflet').LatLng} LatLng
 */

/**
 * @typedef {[number, number]} Location
 */

/**
 * @typedef SetLocationProps
 * @property {(location: LatLng) => void} setLocation
 */

/**
 * @param {SetLocationProps} props
 * @returns {React.JSX.Element}
 */
function SetLocationPopup(props) {
	const [location, setLocation] = useState(
		/** @returns {LatLng | null} */
		() => null
	);

	/**
	 * @returns {import('leaflet').Popup | null}
	 */
	const initialPopupRef = () => null;
	const popupRef = useRef(initialPopupRef());

	useMapEvents({
		click: (event) => {
			if (popupRef.current?.isOpen()) {
				popupRef.current?.close();
			} else {
				setLocation(event.latlng);
			}
		},
	});

	/**
	 * @param {LatLng} location
	 */
	const handleSetLocation = (location) => {
		props.setLocation(location);
		popupRef.current?.close();
	};

	if (location) {
		return (
			<Popup ref={popupRef} position={location} closeButton={false}>
				<button onClick={() => handleSetLocation(location)}>Set here</button>
			</Popup>
		);
	} else {
		return <></>;
	}
}

SetLocationPopup.propTypes = {
	setLocation: PropTypes.func.isRequired,
};

/**
 * @typedef Props
 * @property {boolean} isOpen
 * @property {(location: Location | null) => void} onClose
 * @property {Location} startLocation
 */

/**
 * @param {Props} props
 * @returns {React.JSX.Element}
 */
function SelectLocationModal({ isOpen, onClose, startLocation }) {
	const [location, setLocation] = useState(
		/** @returns {Location?} */
		() => null
	);

	/**
	 * @returns {import('leaflet').Marker?}
	 */
	const initialMarkerRef = () => null;
	const markerRef = useRef(initialMarkerRef());

	return (
		<ReactModal
			className={styles["container"]}
			isOpen={isOpen}
			onRequestClose={() => onClose(null)}
			shouldCloseOnEsc={location === null}
			shouldCloseOnOverlayClick={false}
			style={{
				overlay: {
					backgroundColor: "rgba(0, 0, 0, 0.5)",
				},
			}}
		>
			<div className={styles["content"]}>
				<MapContainer
					closePopupOnClick={false} // Handle this manually
					className={[
						styles["map"],
						leafletDefaults["marker"],
						leafletDefaults["attribution"],
					].join(" ")}
					center={location || startLocation}
					zoom={10}
					zoomControl={false}
					zoomSnap={0.5}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
					/>
					<Marker
						ref={markerRef}
						eventHandlers={{
							dragend: () => {
								if (markerRef.current) {
									const latlng = markerRef.current.getLatLng();
									setLocation([latlng.lat, latlng.lng]);
								}
							},
							click: () => {},
						}}
						position={location || startLocation}
						draggable={true}
					/>
					<SetLocationPopup
						setLocation={(loc) => {
							setLocation([loc.lat, loc.lng]);
						}}
					/>
				</MapContainer>
				<div className={styles["button-container"]}>
					<button
						className={styles["button"]}
						onClick={() => {
							setLocation(null);
							onClose(location);
						}}
						disabled={location === null}
					>
						Confirm
					</button>
					<button
						className={styles["button"]}
						onClick={() => {
							setLocation(null);
							onClose(null);
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		</ReactModal>
	);
}

SelectLocationModal.propTypes = {
	isOpen: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	startLocation: PropTypes.object.isRequired,
};

export default SelectLocationModal;
