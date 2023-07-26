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
  const [zoom, setZoom] = useState(10);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

      const validCoordinates = coordinates.filter((coord) => coord !== null);

      if (validCoordinates.length === 0) {
        console.log("No valid coordinates found.");
        return;
      }

      const [longitude, latitude] = validCoordinates[0];

      // Only update the state if latitude and longitude are not set yet
      if (lat === 0 && lng === 0) {
        setLat(latitude);
        setLng(longitude);
      }

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat], // Use the state values for initial center
        zoom: zoom,
      });

      // Adding markers for all streets
      validCoordinates.forEach(([longitude, latitude], index) => {
        const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]);

        // Add a popup with the address information when the marker is clicked
        const popup = new mapboxgl.Popup().setText(allStreets[index]);
        marker.setPopup(popup);

        // Add click event listener to handle marker clicks
        marker.getElement().addEventListener("click", () => {
          setSelectedMarker(allStreets[index]);
        });

        marker.addTo(map.current);
      });
    };

    initializeMap();
  }, [allStreets, lat, lng, zoom, token]);

  // console.log(allStreets);

  return (
    <>
      <Center>
        <Box>
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

// import React, { useRef, useEffect, useState } from "react";
// import { Box, Heading, Center } from "@chakra-ui/react";
// import mapboxgl from "mapbox-gl";
// import axios from "axios";
// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYWxleHlhbmc0MzU4IiwiYSI6ImNsa2lmdGFicDBnc3YzZm10d3VoMzBzaWsifQ.1bpPFD5GX8MLY58smdNiKA";

// const MapBoxAll = ({ token, allStreets }) => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-78.64);
//   const [lat, setLat] = useState(35.77);
//   const [zoom, setZoom] = useState(10);

//   useEffect(() => {
//     if (map.current) return;

//     const getCoordinates = async (address) => {
//       try {
//         const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//           address
//         )}.json?access_token=${mapboxgl.accessToken}`;
//         const response = await axios.get(url);
//         return response.data.features[0].center;
//       } catch (error) {
//         console.log("Error fetching coordinates:", error);
//         return null;
//       }
//     };

//     const initializeMap = async () => {
//       const coordinatesPromises = allStreets.map((street) =>
//         getCoordinates(street)
//       );
//       const coordinates = await Promise.all(coordinatesPromises);

//       // Filter out null coordinates in case of errors
//       const validCoordinates = coordinates.filter((coord) => coord !== null);

//       if (validCoordinates.length === 0) {
//         console.log("No valid coordinates found.");
//         return;
//       }

//       const [longitude, latitude] = validCoordinates[0];

//       // Only update the state if latitude and longitude are not set yet
//       if (lat === 0 && lng === 0) {
//         setLat(latitude);
//         setLng(longitude);
//       }

//       map.current = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: "mapbox://styles/mapbox/streets-v12",
//         center: [lng, lat], // Use the state values for initial center
//         zoom: zoom,
//       });

//       // Adding markers for all streets
//       validCoordinates.forEach(([longitude, latitude]) => {
//         new mapboxgl.Marker()
//           .setLngLat([longitude, latitude])
//           .addTo(map.current);
//       });
//     };

//     initializeMap();
//   }, [allStreets, lat, lng, zoom]);

//   console.log(allStreets);
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

// export default MapBoxAll;
