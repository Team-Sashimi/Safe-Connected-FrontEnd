import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Center,
  UnorderedList,
  ListItem,
  Input,
  FormLabel,
  InputGroup,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import mapboxgl from "mapbox-gl";
import axios from "axios";
import { Form } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleHlhbmc0MzU4IiwiYSI6ImNsa2lmdGFicDBnc3YzZm10d3VoMzBzaWsifQ.1bpPFD5GX8MLY58smdNiKA";

const SearchMapBox = ({ token, setSelectedSuggestion }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.64);
  const [lat, setLat] = useState(35.77);
  const [zoom, setZoom] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  //   const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);
  }, [lat, lng, zoom]);

  // Function to handle address search
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
    setSuggestions([]); // Clear suggestions after selection (optional).

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
        <FormLabel fontWeight="bold" color="yellow.200" fontSize="sm" mt="2">
          LOCATION:
        </FormLabel>
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            width="100%"
            mb="2"
            fontSize="sm"
            placeholder="Start typing address"
            value={searchQuery}
            onChange={(e) => handleAddressSearch(e.target.value)}
            color="white"
            bg="gray.800"
            px="2" // Reduce horizontal padding
            py="1" // Reduce vertical padding
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
      <Box
        borderRadius="md"
        height="150px"
        width="100%"
        mt="2"
        ref={mapContainer}
      />
    </>
  );
};

export default SearchMapBox;
