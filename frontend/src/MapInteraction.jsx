import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = () => {
  const mapContainer = useRef(null); // Reference to map container

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_TOKEN;
    console.log("API Key:", mapboxgl.accessToken);

    const map = new mapboxgl.Map({
      container: mapContainer.current, // Map container reference
      style: "mapbox://styles/mapbox/streets-v12", // Map style
      center: [-114.0719, 51.0447], // [Longitude, Latitude] pointing at Calgary
      zoom: 9, // Initial zoom level
    });

    // Add a marker
    new mapboxgl.Marker()
      .setLngLat([-114.0719, 51.0447])
      .setPopup(new mapboxgl.Popup().setHTML("<b>Hello, Mapbox!</b>")) // Popup on click
      .addTo(map);

    return () => map.remove(); // Cleanup when component unmounts
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />;
};

export default MapComponent;
