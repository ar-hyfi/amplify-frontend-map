import React, { useRef, useEffect, useState } from 'react';
//import mapboxgl from 'mapbox-gl';
//import ReactMapGL from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import './Map.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// import {
//     MapChipPrimitive 
//    } from './ui-components';


mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJpZWwtaHlmaSIsImEiOiJjbGo3ZHI2cWwwcTlzM3FxZ3RtNDFkcXpkIn0.StEAI2H39Ne4tJ3Pb1DfFA';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);
  const [sites, setSites] = useState([]);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/ariel-hyfi/clkcua2s3003l01qka0339nog',
      center: [lng, lat],
      zoom: zoom
    });

    //console.log(map);

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
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

// const SiteMap = () => {
//     const [map, setMap] = useState(null);
//     const [sites, setSites] = useState([]);
//     const [lng, setLng] = useState(5);
//     const [lat, setLat] = useState(34);
//     const [zoom, setZoom] = useState(1.5);
//     const mapContainerRef = useRef(null); 

//     useEffect(() => {
//         // Initialize the map
//       const initializeMap = () => {
//         const map = new mapboxgl.Map({
//           container: 'map', // HTML element with id 'map'
//           style: 'mapbox://styles/mapbox/streets-v11',
//           center: [0, 0], // Initial center (you can update this later)
//           zoom: 1, // Initial zoom level
//         });
  
//         setMap(map);
//       };
  
//       initializeMap();
//     }, []);
  
   // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //           const response = await axios.get('http://api.hyfi.io/getSites?format=json', {
    //             headers: {
    //               'X_API-KEY': 'VCDxSB4VyR3HSJGk2tZQM5V3IPkB6tHh1RlrMPEw',
    //               // Other headers if needed
    //             },
    //           });
    //           setSites(response.data); // Assuming the API response is an array of site objects with lat and lon
    //         } catch (error) {
    //           console.error('Error fetching data:', error);
    //         }
    //       };
        
    //      // fetchData();
  
    //   fetchData();
  //   const organization = 'hyfi';
  //   const region = 'us-west-2-1';
  //   const token = "JxjGWE-KPUyzNY-b2WBYbFPy42M5-L_kPbjaD6ID5k16eyCIpfkpx0uO3avjT0DWvy31b-fd-7oZwdVuRctg9A==";
  //   const query = `from(bucket: "prod")
  //   |> range(start: -1d)
  //   |> filter(fn: (r) => r._measurement == "maxbotix_depth")
  //   |> filter(fn: (r) => r.site_name == "18.1 Gulley over River Rouge")
  //   |> keep(columns: ["_value","site_code","site_name","_time","lat_navd88","lon_navd88"])
  //   |> sort(columns: ["_time"])
  //   |> last()`;

  //   const geoQuery = `from(bucket: "prod")
  //   |> range(start: -1d)
  //   |> filter(fn: (r) => r._measurement == "lat_navd88")
  //   |> filter(fn: (r) => r.site_name == "18.1 Gulley over River Rouge")
  //   |> sort(columns: ["_time"])
  //   |> last()`;



  //   const fetchData = async (query) => {
  //       const url = `https://${region}.aws.cloud2.influxdata.com/api/v2/query?org=${organization}&` +
  //       `q=${encodeURIComponent(query)}`;

  //       // Make a POST request to the InfluxDB Cloud API
  //       fetch(url, {
  //           method: 'POST',
  //           headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/vnd.flux',
  //           Authorization: `Token ${token}`
  //           },
  //           body: query
  //       })
  //           .then(response => {
  //               response.text()
  //           })

  //           .then(data => {
  //               console.log(data)
  //               // Process the data
  //               //processData(data, geojson, sourceId);

  //               //console.log('Query result:', level_json);
  //           })
  //           .catch(error => {
  //           // Handle any errors
  //           console.error('Error executing query:', error);
  //           });
  //   }

  //   fetchData(geoQuery)

  //   }, []);
  
  //   useEffect(() => {
  //     if (map && sites.length > 0) {
  //       sites.forEach((site) => {
  //         new mapboxgl.Marker()
  //           .setLngLat([site.lon, site.lat])
  //           .addTo(map);
  //       });
  //     }
  //   }, [map, sites]);
  
  //   return (
  //     <div>
  //       <div id="map" style={{ width: '100%', height: '400px' }}></div>
  //     </div>
  //   );
  // };
  
  // export default SiteMap;