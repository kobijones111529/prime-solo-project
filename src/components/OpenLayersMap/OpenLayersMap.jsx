import { Map, MapBrowserEvent, Overlay, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import React, { useEffect, useRef, useState } from 'react';
import XYZ from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Geometry } from 'ol/geom';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import Zoomify from 'ol/source/Zoomify';
import defaultControls from 'ol/control/defaults';
import Zoom from 'ol/control/Zoom';
import DragPan from 'ol/interaction/DragPan';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import KeyboardZoom from 'ol/interaction/KeyboardZoom'
import { always, never } from 'ol/events/condition'
import Feature from 'ol/Feature'

/**
 * @typedef Props
 * @property {string} [className]
 * @property {React.ReactNode} [children]
 */

/**
 * @param {Props} props
 */
function OpenLayersMap(props) {
  const popupRef = useRef((
    /** @returns {HTMLDivElement | null} */
    () => null
  )());

  const [map, setMap] = useState(
    /** @returns {Map | undefined} */
    () => undefined
  );
  const [featuresLayer, setFeaturesLayer] = useState(
    /** @returns {VectorLayer<VectorSource<Geometry>> | undefined} */
    () => undefined
  );

  const mapElement = useRef((
    /** @returns {HTMLDivElement | null} */
    () => null
  )());

  useEffect(() => {
    const markerFeature = new Feature({
      name: 'hi'
    });
    const initialMap = new Map({
      target: mapElement.current || undefined,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}@2x.png',
            tilePixelRatio: 2,
            maxZoom: 20
          })
        })
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 0,
        maxZoom: 20
      }),
      controls: [],
      interactions: [
        new DragPan(),
        new MouseWheelZoom(),
        new KeyboardZoom()
      ]
    });

    const overlay = new Overlay({
      element: popupRef.current || undefined,
      autoPan: true
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
    <div
      tabIndex={0}
      ref={mapElement}
      className={props.className}
    ></div>
    <div ref={popupRef}>
      {props.children}
      <p>Hello</p>
    </div>
    </>
  );
}

export default OpenLayersMap;
