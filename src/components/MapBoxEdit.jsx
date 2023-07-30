import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Center,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import mapboxgl from "mapbox-gl";
import axios from "axios";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleHlhbmc0MzU4IiwiYSI6ImNsa2lmdGFicDBnc3YzZm10d3VoMzBzaWsifQ.1bpPFD5GX8MLY58smdNiKA";
const MapBoxEdit = ({
  token,
  eventID,
  eventAddress,
  eventStNumber,
  eventStreet,
  setSelectedSuggestion,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.64);
  const [lat, setLat] = useState(35.77);
  const [zoom, setZoom] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [marker, setMarker] = useState(null);

  const tempurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    eventStNumber
  )}/${encodeURIComponent(eventStreet)}.json?access_token=${
    mapboxgl.accessToken
  }`;

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

        setMarker(
          new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map.current)
        );

        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map.current);
      })
      .catch((error) => {
        console.log("Error fetching coordinates:", error);
      });
  }, [eventStreet, lat, lng, zoom]);

  const handleAddressSearch = async (searchValue) => {
    setSearchQuery(searchValue);

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchValue
        )}.json?access_token=${mapboxgl.accessToken}`
      );

      if (response.data && response.data.features.length > 0) {
        setSuggestions(response.data.features);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      // Handle error
      console.error("Error searching for address:", error);
    }
  };

  // Function to handle selecting a suggestion
  const handleSelectSuggestion = (suggestion) => {
    setLat(suggestion.geometry.coordinates[1]);
    setLng(suggestion.geometry.coordinates[0]);
    setZoom(15); // You can set the desired zoom level when a suggestion is selected.
    setSuggestions([]);

    if (marker) {
      marker.remove();
    }

    if (map.current) {
      const newMarker = new mapboxgl.Marker().setLngLat([
        suggestion.geometry.coordinates[0],
        suggestion.geometry.coordinates[1],
      ]);
      newMarker.addTo(map.current);
      setMarker(newMarker); // Save the marker reference
      map.current.setCenter([
        suggestion.geometry.coordinates[0],
        suggestion.geometry.coordinates[1],
      ]); // Recenter the map
      map.current.setZoom(15); // Set the desired zoom level
    }
    setSelectedSuggestion(suggestion);
  };

  return (
    <>
      <Box width="100%" maxWidth="700px" mx="auto" position="relative">
        {/* <FormLabel fontWeight="bold" color="yellow.200" fontSize="10px" mt="2">
        LOCATION:
      </FormLabel> */}
        <Box borderRadius="md" height="150px" width="100%" ref={mapContainer} />

        <InputGroup size="xs" mt="2">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            border="none"
            justifyContent="flex-end"
            type="text"
            width="80%"
            size="xs"
            fontSize="xs"
            placeholder="Start typing address"
            value={searchQuery}
            onChange={(e) => handleAddressSearch(e.target.value)}
            color="white"
            bg="gray.800"
            px="2"
            py="1"
          />
        </InputGroup>

        {/* Display autocomplete suggestions */}
        {suggestions.length > 0 && (
          <Box
            position="absolute"
            width="100%"
            bg="white"
            p={2}
            borderRadius="md"
            boxShadow="md"
            zIndex="1"
            top="calc(100% + 10px)"
            fontSize="sm"
          >
            <UnorderedList p={0} m={0} listStyleType="none">
              {suggestions.map((suggestion) => (
                <ListItem
                  key={suggestion.id}
                  cursor="pointer"
                  p={2}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  borderBottom="1px solid #ccc"
                >
                  {suggestion.place_name}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MapBoxEdit;

// console.log(encodeURIComponent(eventStreet));
// console.log(eventStNumber);

// console.log(tempurl);

// import React, { useRef, useEffect, useState } from "react";
// import {
//   Box,
//   Heading,
//   Center,
//   FormLabel,
//   InputGroup,
//   InputLeftElement,
//   Input,
//   UnorderedList,
//   ListItem,
// } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
// import mapboxgl from "mapbox-gl";
// import axios from "axios";
// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYWxleHlhbmc0MzU4IiwiYSI6ImNsa2lmdGFicDBnc3YzZm10d3VoMzBzaWsifQ.1bpPFD5GX8MLY58smdNiKA";
// const MapBoxEdit = ({
//   token,
//   eventID,
//   eventAddress,
//   eventStNumber,
//   eventStreet,
//   setSelectedSuggestion,
// }) => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-78.64);
//   const [lat, setLat] = useState(35.77);
//   const [zoom, setZoom] = useState(15);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [marker, setMarker] = useState(null);

//   const tempurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//     eventStNumber
//   )}/${encodeURIComponent(eventStreet)}.json?access_token=${
//     mapboxgl.accessToken
//   }`;

//   useEffect(() => {
//     if (map.current) return;
//     axios
//       .get(tempurl)
//       .then((response) => {
//         const [longitude, latitude] = response.data.features[0].center;

//         setLng(longitude);
//         setLat(latitude);

//         map.current = new mapboxgl.Map({
//           container: mapContainer.current,
//           style: "mapbox://styles/mapbox/streets-v12",
//           center: [longitude, latitude],
//           zoom: zoom,
//         });

//         setMarker(
//           new mapboxgl.Marker()
//             .setLngLat([longitude, latitude])
//             .addTo(map.current)
//         );

//         new mapboxgl.Marker()
//           .setLngLat([longitude, latitude])
//           .addTo(map.current);
//       })
//       .catch((error) => {
//         console.log("Error fetching coordinates:", error);
//       });
//   }, [eventStreet, lat, lng, zoom]);

//   const handleAddressSearch = async (searchValue) => {
//     setSearchQuery(searchValue);

//     try {
//       const response = await axios.get(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//           searchValue
//         )}.json?access_token=${mapboxgl.accessToken}`
//       );

//       if (response.data && response.data.features.length > 0) {
//         setSuggestions(response.data.features);
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       // Handle error
//       console.error("Error searching for address:", error);
//     }
//   };

//   // Function to handle selecting a suggestion
//   const handleSelectSuggestion = (suggestion) => {
//     setLat(suggestion.geometry.coordinates[1]);
//     setLng(suggestion.geometry.coordinates[0]);
//     setZoom(15); // You can set the desired zoom level when a suggestion is selected.
//     setSuggestions([]);

//     if (marker) {
//       marker.remove();
//     }

//     if (map.current) {
//       const newMarker = new mapboxgl.Marker().setLngLat([
//         suggestion.geometry.coordinates[0],
//         suggestion.geometry.coordinates[1],
//       ]);
//       newMarker.addTo(map.current);
//       setMarker(newMarker); // Save the marker reference
//       map.current.setCenter([
//         suggestion.geometry.coordinates[0],
//         suggestion.geometry.coordinates[1],
//       ]); // Recenter the map
//       map.current.setZoom(15); // Set the desired zoom level
//     }
//     setSelectedSuggestion(suggestion);
//   };

//   return (
//     <>
//       <Center>
//         <Box>
//           <FormLabel fontWeight="bold" color="yellow.200">
//             EDIT LOCATION:
//           </FormLabel>
//           <InputGroup>
//             <InputLeftElement pointerEvents="none">
//               <SearchIcon color="gray.300" />
//             </InputLeftElement>
//             <Input
//               type="text"
//               width="700px"
//               mb="10"
//               placeholder="Start typing address"
//               value={searchQuery}
//               onChange={(e) => handleAddressSearch(e.target.value)}
//               color="white"
//               bg="gray.800" // Change the background color here if needed
//             />
//           </InputGroup>

//           {/* Display autocomplete suggestions */}
//           {suggestions.length > 0 && (
//             <UnorderedList
//               mt={2}
//               border="1px solid #ccc"
//               p={2}
//               borderRadius="md"
//               bg="white"
//             >
//               {suggestions.map((suggestion) => (
//                 <>
//                   <ListItem
//                     key={suggestion.id}
//                     cursor="pointer"
//                     p={2}
//                     onClick={() => handleSelectSuggestion(suggestion)}
//                   >
//                     {suggestion.place_name}
//                   </ListItem>
//                 </>
//               ))}
//             </UnorderedList>
//           )}
//           <Box
//             borderRadius="md"
//             height="300px"
//             width="700px"
//             mr="20"
//             ref={mapContainer}
//           />
//         </Box>
//       </Center>
//     </>
//   );
// };

// export default MapBoxEdit;
