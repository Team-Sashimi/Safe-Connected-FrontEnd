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
  const [zoom, setZoom] = useState(14);

  // const tempurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
  //   eventStNumber
  // )}/${encodeURIComponent(eventStreet)}.json?access_token=${
  //   mapboxgl.accessToken
  // }`;

  const tempurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    eventAddress
  )}/.json?access_token=${mapboxgl.accessToken}`;

  useEffect(() => {
    if (map.current) return;
    axios
      .get(tempurl)
      .then((response) => {
        console.log("Response data:", response.data);

        const [longitude, latitude] = response.data.features[0].center;

        setLng(longitude);
        setLat(latitude);

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [longitude, latitude],
          zoom: zoom,
        });

        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      })
      .catch((error) => {
        console.log("Error fetching coordinates:", error);
      });
  }, [eventStreet, lat, lng, zoom]);

  // console.log(encodeURIComponent(eventStreet));
  // console.log(eventStNumber);
  // console.log(eventStreet);
  // console.log(tempurl);

  console.log(eventAddress);

  return (
    <>
      <Center>
        <Box>
          <Box
            borderRadius="md"
            height="150px"
            width="250px"
            ref={mapContainer}
          />
        </Box>
      </Center>
    </>
  );
};

export default MapBox;

// import React, { useRef, useEffect, useState } from "react";
// import { Box, Heading, Center, Text, Button, Tooltip } from "@chakra-ui/react";
// import mapboxgl from "mapbox-gl";

// const MapBox = ({ token, eventID, eventAddress }) => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-78.64);
//   const [lat, setLat] = useState(35.77);
//   const [zoom, setZoom] = useState(9);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v12",
//       center: [lng, lat],
//       zoom: zoom,
//     });
//   });

//   return (
//     <>
//       <Center>
//         <Box>
//           <Box
//             borderRadius="md"
//             height="500px"
//             width="700px"
//             ref={mapContainer}
//           />
//         </Box>
//       </Center>
//     </>
//   );
// };

// export default MapBox;
