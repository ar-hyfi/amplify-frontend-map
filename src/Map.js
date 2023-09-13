import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import './Map.css';
import ReactDOM from 'react-dom';
import { fetchDataFromInflux } from './fetchFromInflux';
import MapChip from './components/MapChip';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// const markerData = [
//   { id: 1, text: '18.1 Gulley over River Rouge', coordinates: [-83.28581008, 42.30191714], value:300 },
//   { id: 2, text: '18.2 Telegraph over River Rouge', coordinates: [-83.27168646, 42.30141717], value:2000 },
//   // Add more marker data as needed
// ];

const markerData =   [
  { id: 1, site_name:'18.1 Gulley over River Rouge', coordinates: [-83.28581008, 42.30191714], value:300},
  { id: 2, site_name:'18.2 Telegraph over River Rouge', coordinates: [-83.27168646, 42.30141717], value:2000},
  ]
  

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJpZWwtaHlmaSIsImEiOiJjbGo3ZHI2cWwwcTlzM3FxZ3RtNDFkcXpkIn0.StEAI2H39Ne4tJ3Pb1DfFA';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-83.2776);
  const [lat, setLat] = useState(42.3015);
  const [zoom, setZoom] = useState(13.67);

  //const [influx_data, setInfluxData] = useState([]);

  const region = 'us-west-2-1';
  const organization = 'hyfi';
  //const [markerData, setMarkerData] = useState([]);


  // Initialize map when component mounts
  useEffect(() => {
    const fetchDataAndUpdateMap = () => {
      fetchDataFromInflux(markerData, region, organization)
        .then((updatedMarkerData) => {
          console.log(updatedMarkerData);
          updatedMarkerData.forEach((marker) => {
            const { id, site_name, coordinates, value } = marker;

            const customMarkerElement = document.createElement('div');
            customMarkerElement.className = 'custom-marker';

            ReactDOM.render(<MapChip value={marker.value} />, customMarkerElement);

            new mapboxgl.Marker(customMarkerElement)
              .setLngLat(coordinates)
              .addTo(map);
          });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };



    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lng, lat],
      zoom: zoom
    });
    
    // fetch data and update map initially
    fetchDataAndUpdateMap();

    // Set up a timer to fetch data and update the map every 5 minutes
    const fetchInterval = setInterval(() => {
      fetchDataAndUpdateMap();
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    
    // Clean up the interval timer when the component unmounts
    return () => {
      clearInterval(fetchInterval);
    };
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