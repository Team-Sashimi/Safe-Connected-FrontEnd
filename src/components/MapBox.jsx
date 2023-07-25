import React, { useRef, useEffect, useState } from "react";
import { Box, Heading, Center } from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleHlhbmc0MzU4IiwiYSI6ImNsa2lmdGFicDBnc3YzZm10d3VoMzBzaWsifQ.1bpPFD5GX8MLY58smdNiKA";
const MapBox = ({
  token,
  eventID,
  eventAddress,
  eventStNumber,
  eventStreet,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.64);
  const [lat, setLat] = useState(35.77);
  const [zoom, setZoom] = useState(15);
  const tempurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    eventStreet
  )}.json?access_token=${mapboxgl.accessToken}`;

  useEffect(() => {
    if (!mapboxgl.accessToken) {
      mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace this with your actual Mapbox access token
    }

    if (map.current) return; // initialize map only once

    // Fetch coordinates from the tempurl using Axios
    axios
      .get(tempurl)
      .then((response) => {
        const [longitude, latitude] = response.data.features[0].center;

        // Update map's center with the fetched coordinates
        setLng(longitude);
        setLat(latitude);

        // Initialize map
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [longitude, latitude],
          zoom: zoom,
        });

        // Add a marker on the map at the fetched coordinates
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      })
      .catch((error) => {
        console.log("Error fetching coordinates:", error);
      });
  }, [eventStreet, lat, lng, zoom]);

  console.log(eventAddress);

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
