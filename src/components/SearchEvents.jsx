import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Container,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Avatar,
  Icon,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import { ArrowBackIcon, ArrowForwardIcon, WarningIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const SearchEvents = ({ token, username, userRole, orgDetails, language }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [allStreets, setAllStreets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5; // Reduce the number of events per page for smaller screens

  const navigate = useNavigate();

  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}${language}/org/1/events`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setAllEvents(res.data);
        const streetNamesArray = res.data.map((e) => e.full_address);
        setAllStreets(streetNamesArray);
      });
  }, [token]);

  // /?event_title=<searchtext>

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
  };

  const formatToRegularTime = (militaryTime) => {
    const [hours, minutes] = militaryTime.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const itemsPerPage = 7; // Number of items to show per page, adjusted to 5
  const totalPages = Math.ceil(allEvents.length / itemsPerPage);

  // Calculate the start and end index of the items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the events for the current page
  const eventsForPage = allEvents.slice(startIndex, endIndex);

  // Function to handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(allEvents);

  return (
    <Flex mt="12">
      <Box
        width="90%"
        height="80vh"
        m="5%"
        p={4}
        textAlign="right"
        marginLeft="20px"
        color="white" // White text color
        borderRadius="md" // Rounded corners
        overflow="auto" // Enable scroll if contents overflow
      >
        <Heading color="yellow.200" size="md" mb="4" mr="4">
          Browse Events
        </Heading>
        <InputGroup size="xs" mt="2">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            border="none"
            justifyContent="flex-end"
            type="text"
            width="100%"
            size="xs"
            fontSize="xs"
            placeholder="Search by keywords"
            // value={searchQuery}
            // onChange={(e) => handleEventSearch(e.target.value)}
            color="white"
            px="2"
            py="1"
          />
        </InputGroup>
        <SimpleGrid columns={2} spacing={4}>
          {eventsForPage.map((event) => (
            <Box
              key={event.id}
              p={4}
              bg="transparent" // Transparent background for individual event boxes
              boxShadow="md"
              rounded="md"
            >
              <Heading fontSize="12px">{event.event_title}</Heading>
              <Text fontWeight="bold" fontSize="10px">
                {dayjs(event.event_date).format("MMMM D, YYYY")}
              </Text>
              {userRole === "Manager" ? (
                <Text
                  onClick={() => handleEventDetails(event.id)}
                  cursor="pointer"
                  size="sm"
                  mt="5"
                  color="yellow.200"
                  fontSize="10px"
                >
                  SEE MORE
                </Text>
              ) : (
                <Text
                  onClick={() => handleEventDetails(event.id)}
                  cursor="pointer"
                  size="sm"
                  mt="5"
                  color="yellow.200"
                  fontSize="8px"
                >
                  LEARN MORE
                </Text>
              )}
            </Box>
          ))}
        </SimpleGrid>

        <Box mt="-5vh">
          {currentPage > 1 && (
            <Button
              size="xs"
              onClick={() => handlePageChange(currentPage - 1)}
              mr={2}
            >
              <Icon as={ArrowBackIcon} />
            </Button>
          )}
          {currentPage < totalPages && (
            <Button size="xs" onClick={() => handlePageChange(currentPage + 1)}>
              <Icon as={ArrowForwardIcon} />
            </Button>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default SearchEvents;
