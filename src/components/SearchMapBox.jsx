import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Center,
  UnorderedList,
  ListItem,
  Input,
} from "@chakra-ui/react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxleHlhbmc0MzU4IiwiYSI6ImNsa2lmdGFicDBnc3YzZm10d3VoMzBzaWsifQ.1bpPFD5GX8MLY58smdNiKA";

const SearchMapBox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-78.64);
  const [lat, setLat] = useState(35.77);
  const [zoom, setZoom] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
  };

  return (
    <>
      <Center>
        <Box>
          <Heading>Map Box</Heading>
          {/* Input field with autocomplete feature */}
          <Input
            type="text"
            width="700px"
            mb="10"
            placeholder="Enter address to search"
            value={searchQuery}
            onChange={(e) => handleAddressSearch(e.target.value)}
            color="white"
          />
          {/* Display autocomplete suggestions */}
          {suggestions.length > 0 && (
            <UnorderedList
              mt={2}
              border="1px solid #ccc"
              p={2}
              borderRadius="md"
              bg="white"
            >
              {suggestions.map((suggestion) => (
                <ListItem
                  key={suggestion.id}
                  cursor="pointer"
                  _hover={{ background: "#f0f0f0" }}
                  p={2}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  {suggestion.place_name}
                </ListItem>
              ))}
            </UnorderedList>
          )}
          <Box
            borderRadius="md"
            height="300px"
            width="700px"
            mr="20"
            ref={mapContainer}
          />
        </Box>
      </Center>
    </>
  );
};

export default SearchMapBox;
