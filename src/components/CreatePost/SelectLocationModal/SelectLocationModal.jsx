import { rootSelector } from 'constants/index';
import { LatLng, Map } from 'leaflet';
import React, { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import ReactModal from 'react-modal';
import styles from './SelectLocationModal.module.css';
import './SelectLocationModal.css';

ReactModal.setAppElement(rootSelector);

/**
 * @typedef {[number, number]} Location
 */

/**
 * @typedef SetLocationProps
 * @property {(location: LatLng) => void} setLocation
 */

/**
 * @param {SetLocationProps} props
 */
function SetLocationPopup(props) {
  const [location, setLocation] = useState(
    /** @returns {LatLng | null} */
    () => null
  );

  const popupRef = useRef((
    /** @returns {import('leaflet').Popup | null} */
    () => null
  )());

  useMapEvents({
    click: event => {
      if (popupRef.current?.isOpen()) {
        popupRef.current?.close();
      } else {
        setLocation(event.latlng);
      }
    }
  })

  /**
   * @param {LatLng} location
   */
  const handleSetLocation = location => {
    props.setLocation(location)
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

/**
 * @typedef Props
 * @property {boolean} isOpen
 * @property {(location: Location?) => void} onClose
 * @property {Location} startLocation
 */

/**
 * @param {Props} props
 */
function SelectLocationModal({ isOpen, onClose, startLocation }) {
  const [location, setLocation] = useState(
    /** @returns {Location?} */
    () => null
  );

  const markerRef = useRef((
    /** @returns {import('leaflet').Marker?} */
    () => null
  )());

  return (
    <ReactModal
      className={styles['container']}
      isOpen={isOpen}
      onRequestClose={() => onClose(null)}
      shouldCloseOnEsc={location === null}
      shouldCloseOnOverlayClick={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      }}
    >
      <div className={styles['content']}>
        <MapContainer
          closePopupOnClick={false} // Handle this manually
          className={styles['map']}
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
                  const latlng = markerRef.current.getLatLng()
                  setLocation([latlng.lat, latlng.lng]);
                }
              },
              click: () => { }
            }}
            position={location || startLocation}
            draggable={true}
          />
          <SetLocationPopup setLocation={loc => {
            setLocation([loc.lat, loc.lng]);
          }} />
        </MapContainer>
        <div className={styles['button-container']}>
          <button
            className={styles['button']}
            onClick={() => {
              setLocation(null);
              onClose(location);
            }}
            disabled={location === null}
          >Confirm</button>
          <button
            className={styles['button']}
            onClick={() => {
              setLocation(null);
              onClose(null);
            }}
          >Cancel</button>
        </div>
      </div>
    </ReactModal>
  );
}

export default SelectLocationModal;
