import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/**
 * @typedef Props
 * @property {[number, number]} center
 * @property {number} [zoom]
 */

/**
 * @param {Props} props
 */
function TrackCenter(props) {
  const map = useMap();

  useEffect(() => {
    map.setView(props.center, props.zoom);
  }, [props.center, props.zoom]);

  return null;
}

export default TrackCenter
