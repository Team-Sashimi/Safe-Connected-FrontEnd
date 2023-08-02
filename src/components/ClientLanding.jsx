import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Center,
  Text,
  Button,
  Flex,
  Avatar,
  InputGroup,
  Container,
  SimpleGrid,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import landing_04 from "../assets/landing_04-01.svg";

const ClientLanding = ({ username, token, userRole, language, orgDetails }) => {
  const [clientEvents, setClientEvents] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState(null);
  const [publishedFilter, setPublishedFilter] = useState(null);
  const navigate = useNavigate();

  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}${language}/client/event/list`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setClientEvents(res.data);
      })
      .catch((error) => {
        console.log("Error fetching client events:", error);
      });
  }, [token]);

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
    setEventID(eventID);
  };

  console.log(clientEvents);
  console.log(orgDetails);
  return (
    <SimpleGrid
      columns={2}
      rows={2}
      bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #1E2065 56.45%, #020515 86.14%)"
      h="100vh"
      overflow="overlay"
      spacing={3}
    >
      <Box w="250px">
        <Flex direction="column">
          <Box color="blackAlpha.200" h="90px"></Box>
          <Box color="blackAlpha.200" h="30px" ml="7">
            <Heading color="whiteAlpha.800" fontSize="20px">
              Browse {orgDetails.org_name}'s Events
            </Heading>
          </Box>
          <Box color="blackAlpha.200" h="20px">
            <Flex mt="" justifyContent="center" alignItems="center">
              <Select
                size="sm"
                border="none"
                placeholder="Event Type"
                color="whiteAlpha.700"
                fontSize="12px"
                w="120px"
                onChange={(e) => setEventTypeFilter(e.target.value)}
              >
                <option value="1">Health</option>
                <option value="2">Finance</option>
                <option value="3">Education</option>
              </Select>
            </Flex>
          </Box>

          <Flex justifyContent="center">
            <Box maxHeight="100vh" mt="20px">
              {clientEvents.length === 0 ? (
                <>
                  <Skeleton height="80px" width="200px" mb="2" />
                  <Skeleton height="80px" width="200px" mb="2" />
                  <Skeleton height="80px" width="200px" mb="2" />
                </>
              ) : (
                <>
                  {clientEvents
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
                        w="200px"
                        boxShadow="md"
                        rounded="md"
                        onClick={() => handleEventDetails(event.id)}
                      >
                        <Heading fontSize="14px" mb="1">
                          {event.event_title}
                        </Heading>
                        <Text
                          fontWeight="bold"
                          fontSize="10px"
                          color="whiteAlpha.600"
                        >
                          {dayjs(event.event_date).format("MM/DD/YYYY")}
                        </Text>
                      </Box>
                    ))}

                  {eventTypeFilter &&
                    clientEvents.filter(
                      (event) => event.event_type === parseInt(eventTypeFilter)
                    ).length === 0 && (
                      <Box
                        cursor="default"
                        p={4}
                        mb="2"
                        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
                        color="whiteAlpha.800"
                        height="80px"
                        w="200px"
                        boxShadow="md"
                        rounded="md"
                      >
                        <Heading fontSize="14px" mb="1">
                          Sorry, there are no events available right now.
                        </Heading>
                      </Box>
                    )}
                </>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Box
        // bg="yellow"
        h="100vh"
        w="160px"
        // mr="20px"
        position="fixed"
        right="0"
        backgroundImage={`url(${landing_04})`}
        backgroundSize="cover"
        backgroundPosition="center"
      ></Box>
      <Box color="tomato" w="200"></Box>
      <Box color="tomato" w="200"></Box>
    </SimpleGrid>
  );
};

export default ClientLanding;
