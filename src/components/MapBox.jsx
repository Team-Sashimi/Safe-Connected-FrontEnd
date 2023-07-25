import React, { useRef, useEffect, useState } from "react";
import { Box, Heading, Center, Text, Button, Tooltip } from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleHlhbmc0MzU4IiwiYSI6ImNsa2lmeW9hcTBncGQzc3FveWMwNWxxYjkifQ.WPeoB9EPuO5yFR7WYo-lvg";

const MapBox = ({ token, eventID }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.64);
  const [lat, setLat] = useState(35.77);
  const [zoom, setZoom] = useState(9);

  const mapboxURL =
    "https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json";

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <>
      <Center>
        <Box>
          <Heading>Map Box</Heading>
          <Box
            borderRadius="md"
            height="500px"
            width="700px"
            ref={mapContainer}
          />
        </Box>
      </Center>
    </>
  );
};

export default MapBox;
