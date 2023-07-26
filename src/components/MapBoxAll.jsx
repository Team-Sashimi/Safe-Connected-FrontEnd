import React, { useRef, useEffect, useState } from "react";
import { Box, Heading, Center } from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleHlhbmc0MzU4IiwiYSI6ImNsa2lmdGFicDBnc3YzZm10d3VoMzBzaWsifQ.1bpPFD5GX8MLY58smdNiKA";

const MapBoxAll = ({ token, allStreets }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.64);
  const [lat, setLat] = useState(35.77);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (map.current) return;

    const getCoordinates = async (address) => {
      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${mapboxgl.accessToken}`;
        const response = await axios.get(url);
        return response.data.features[0].center;
      } catch (error) {
        console.log("Error fetching coordinates:", error);
        return null;
      }
    };

    const initializeMap = async () => {
      const coordinatesPromises = allStreets.map((street) =>
        getCoordinates(street)
      );
      const coordinates = await Promise.all(coordinatesPromises);

      // Filter out null coordinates in case of errors
      const validCoordinates = coordinates.filter((coord) => coord !== null);

      if (validCoordinates.length === 0) {
        console.log("No valid coordinates found.");
        return;
      }

      const [longitude, latitude] = validCoordinates[0];

      setLng(longitude);
      setLat(latitude);

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [longitude, latitude],
        zoom: zoom,
      });

      // Adding markers for all streets
      validCoordinates.forEach(([longitude, latitude]) => {
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      });
    };

    initializeMap();
  }, [allStreets, lat, lng, zoom]);

  console.log(allStreets);
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

export default MapBoxAll;
