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

    // Load GeoJSON layers
    map.on("load", () => {
      // Add Caribou Range Layer
      map.addSource("caribou-range", {
        type: "geojson",
        data: "/data/Caribou_Range.geojson",
      });

      map.addLayer({
        id: "caribou-layer",
        type: "fill",
        source: "caribou-range",
        paint: {
          "fill-color": "#008000", // Green for forest/nature
          "fill-opacity": 0.5,
          "fill-outline-color": "#004d00",
        },
      });

      // Add Grizzly Bear Habitat Layer
      map.addSource("grizzly-habitat", {
        type: "geojson",
        data: "/data/Grizzly_Bear_Range.geojson",
      });

      map.addLayer({
        id: "grizzly-layer",
        type: "fill",
        source: "grizzly-habitat",
        paint: {
          "fill-color": "#8B4513", // Brown for bear habitat
          "fill-opacity": 0.6,
          "fill-outline-color": "#5C3317",
        },
      });
    });

    return () => map.remove(); // Cleanup when component unmounts
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "calc(100vh - 10rem)" }} />;
};

export default MapComponent;
