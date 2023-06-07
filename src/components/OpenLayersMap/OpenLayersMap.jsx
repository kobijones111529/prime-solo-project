import { Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import React, { useEffect, useRef, useState } from "react";
import XYZ from "ol/source/XYZ";
import DragPan from "ol/interaction/DragPan";
import MouseWheelZoom from "ol/interaction/MouseWheelZoom";
import KeyboardZoom from "ol/interaction/KeyboardZoom";
import PropTypes from "prop-types";

/**
 * @template T
 * @typedef {import('ol/layer/Vector')} VectorLayer
 */

/**
 * @template T
 * @typedef {import('ol/layer/Vector')} VectorSource
 */

/**
 * @typedef {import('ol/geom').Geometry} Geometry
 */

/**
 * @typedef Props
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 */

/**
 * @param {Props} props
 * @returns {React.JSX.Element}
 */
function OpenLayersMap(props) {
	const popupRef = useRef(
		/** @returns {HTMLDivElement | null} */
		(() => null)()
	);

	const [_map, setMap] = useState(
		/** @returns {Map | undefined} */
		() => undefined
	);
	const [featuresLayer, setFeaturesLayer] = useState(
		/** @returns {VectorLayer<VectorSource<Geometry>> | undefined} */
		() => undefined
	);

	const mapElement = useRef(
		/** @returns {HTMLDivElement | null} */
		(() => null)()
	);

	useEffect(() => {
		const initialMap = new Map({
			target: mapElement.current || undefined,
			layers: [
				new TileLayer({
					source: new XYZ({
						url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}@2x.png",
						tilePixelRatio: 2,
						maxZoom: 20,
					}),
				}),
			],
			view: new View({
				projection: "EPSG:3857",
				center: [0, 0],
				zoom: 0,
				maxZoom: 20,
			}),
			controls: [],
			interactions: [new DragPan(), new MouseWheelZoom(), new KeyboardZoom()],
		});

		const overlay = new Overlay({
			element: popupRef.current || undefined,
			autoPan: true,
		});
		initialMap.addOverlay(overlay);

		setMap(initialMap);
		setFeaturesLayer(featuresLayer);

		return () => {
			mapElement.current = null;
		};
	}, []);

	return (
		<>
			<div tabIndex={0} ref={mapElement} className={props.className}></div>
			<div ref={popupRef}>
				{props.children}
				<p>Hello</p>
			</div>
		</>
	);
}

OpenLayersMap.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.object.isRequired,
};

export default OpenLayersMap;
