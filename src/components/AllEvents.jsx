import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Flex,
  Heading,
  Box,
  Center,
  Text,
  Input,
  Button,
  Grid,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import dayjs from "dayjs";

const AllEvents = ({ username, token, userRole, language }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState(null);
  const [publishedFilter, setPublishedFilter] = useState(null);

  const baseURL = "https://safe-connected.onrender.com/";
  useEffect(() => {
    axios
      .get(`${baseURL}${language}/event/search/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setAllEvents(res.data);
      });
  }, [token]);

  console.log(allEvents);
  return (
    <>
      <SimpleGrid
        h="100vh"
        alignContent="center"
        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #1E2065 56.45%, #020515 86.14%)"
        columns={1}
        rows={5} // Changed rows to 5 to accommodate headline and 3 Select inputs
        spacing={1}
      >
        <Box height="10px" />

        <Box textAlign="center">
          {userRole === "Client" && (
            <Heading color="white" as="h1" size="md">
              Your Organization Events
            </Heading>
          )}
          {userRole === "Manager" && (
            <Heading color="white" as="h1" size="md">
              Browse, Sort & Manage Events
            </Heading>
          )}
        </Box>

        <Flex mt="4" justifyContent="center" alignItems="center">
          <Select
            size="sm"
            borderRadius="lg"
            placeholder="Event Type"
            color="yellow.200"
            fontSize="10px"
            w="100px"
            mx={2}
            onChange={(e) => setEventTypeFilter(e.target.value)}
          >
            <option value="1">Health</option>
            <option value="2">Finance</option>
            <option value="3">Education</option>
          </Select>
          {userRole === "Manager" && (
            <Select
              size="sm"
              borderRadius="lg"
              placeholder="Published"
              color="yellow.200"
              fontSize="10px"
              w="100px"
              mx={2}
              onChange={(e) => setPublishedFilter(e.target.value)}
            >
              <option value="True">Published for all</option>
              <option value="False">Save for later</option>
            </Select>
          )}
          {/* {userRole === "Client" && (
          <Select
            size="sm"
            borderRadius="lg"
            placeholder="Signed Up"
            color="yellow.200"
            fontSize="10px"
            w="100px"
            mx={2}
            onChange={(e) => setPublishedFilter(e.target.value)}
          >
            <option value="True">Attending</option>
            <option value="False">Not Attending</option>
          </Select>
        )} */}
          {/* <Button
            mx={2}
            variant="none"
            borderRadius="lg"
            color="yellow.200"
            fontSize="10px"
            size="sm"
            colorScheme="blue"
            onClick={handleShowAllEvents}
          >
            Show All
          </Button> */}
        </Flex>
        <Box mt="3" overflow="auto" maxHeight="410px">
          <Flex direction="column" justifyContent="center" alignItems="center">
            {allEvents
              .filter((event) => {
                if (eventTypeFilter) {
                  return event.event_type === parseInt(eventTypeFilter);
                }
                return true;
              })
              .filter((event) => {
                if (publishedFilter !== null) {
                  return event.privacy === (publishedFilter === "True");
                }
                return true;
              })
              .map((event) => (
                <Box
                  key={event.id}
                  cursor="pointer"
                  p={4}
                  mb="2"
                  bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
                  color="whiteAlpha.800"
                  height="80px"
                  w="300px"
                  boxShadow="md"
                  rounded="md"
                  overflow="auto"
                  onClick={() => handleEventDetails(event.id)}
                >
                  <Heading fontSize="14px" mb="2">
                    {event.event_title} |{" "}
                    {dayjs(event.event_date).format("MMMM D, YYYY")}{" "}
                  </Heading>

                  <Text fontWeight="bold" fontSize="10px">
                    {event.general_notes}
                  </Text>
                </Box>
              ))}
            <Box></Box>
            {/* <Box mb="2" bg="tomato" height="80px" w="300px"></Box>
            <Box mb="2" bg="tomato" height="80px" w="300px"></Box>
            <Box mb="2" bg="tomato" height="80px" w="300px"></Box>
            <Box mb="2" bg="tomato" height="80px" w="300px"></Box>
            <Box mb="2" bg="tomato" height="80px" w="300px"></Box> */}
          </Flex>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default AllEvents;
