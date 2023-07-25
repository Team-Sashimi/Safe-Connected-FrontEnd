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
  const [zoom, setZoom] = useState(15);
  const tempurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    allStreets
  )}.json?access_token=${mapboxgl.accessToken}`;

  useEffect(() => {
    if (map.current) return;

    axios
      .get(tempurl)
      .then((response) => {
        const [longitude, latitude] = response.data.features[0].center;

        setLng(longitude);
        setLat(latitude);

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [longitude, latitude],
          zoom: zoom,
        });

        // Adding markers for all streets
        allStreets.forEach((street) => {
          new mapboxgl.Marker()
            .setLngLat([street.longitude, street.latitude])
            .addTo(map.current);
        });
      })
      .catch((error) => {
        console.log("Error fetching coordinates:", error);
      });
  }, [allStreets, lat, lng, zoom]);

  //   console.log(encodeURIComponent(eventStreet));
  //   console.log(eventAddress);

  //   console.log(allStreets);
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
