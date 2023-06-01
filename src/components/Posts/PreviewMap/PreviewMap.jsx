import React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import TrackCenter from './TrackCenter';

import styles from './PreviewMap.module.css';

/**
 * @typedef Location
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef Props
 * @property {Location} center
 * @property {number} zoom
 */

/**
 * @param {Props} props
 */
function PreviewMap({ center, zoom }) {
  return (
    <MapContainer
      zoomControl={false}
      className={`${styles['map']}`}
      center={[center.latitude, center.longitude]}
      zoom={zoom}
      doubleClickZoom={false}
      scrollWheelZoom={false}
      dragging={false}
      keyboard={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      <TrackCenter center={[center.latitude, center.longitude]} />
      <Marker position={[center.latitude, center.longitude]} />
    </MapContainer>
  );
}

export default PreviewMap;
