import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import './Map.css';
import ReactDOM from 'react-dom';

import MapChip from './components/MapChip';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const markerData = [
  { id: 1, text: '18.1 Gulley over River Rouge', coordinates: [-83.28581008, 42.30191714], value:300 },
  { id: 2, text: '18.2 Telegraph over River Rouge', coordinates: [-83.27168646, 42.30141717], value:2000 },
  // Add more marker data as needed
];



mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJpZWwtaHlmaSIsImEiOiJjbGo3ZHI2cWwwcTlzM3FxZ3RtNDFkcXpkIn0.StEAI2H39Ne4tJ3Pb1DfFA';

const Map = () => {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null); // Ref for the custom marker element
  const overrides = {"value": 2003}

  const [lng, setLng] = useState(-83.1784);
  const [lat, setLat] = useState(42.3190);
  const [zoom, setZoom] = useState(11.41);
  const [sites, setSites] = useState([]);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/ariel-hyfi/clkcua2s3003l01qka0339nog',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

// Loop through marker data and create markers
markerData.forEach((marker) => {
  // Create a custom marker element for each marker
  const customMarkerElement = document.createElement('div');
  customMarkerElement.className = 'custom-marker';

  // Render the MapChip component inside the custom marker element
  ReactDOM.render(<MapChip value={marker.value} />, customMarkerElement);

  // Create a custom marker using the custom element and set its position
  new mapboxgl.Marker(customMarkerElement)
    .setLngLat(marker.coordinates)
    .addTo(map);
});


    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;