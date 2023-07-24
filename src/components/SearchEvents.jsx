import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Container,
  Box,
  Heading,
  Input,
  Center,
  Text,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import dayjs from "dayjs";

const SearchEvents = ({ token, username, userRole }) => {
  const [allEvents, setAllEvents] = useState([]);
  const navigate = useNavigate();
  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}event/all/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setAllEvents(res.data);
      });
  }, [token]);

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
  };

  console.log(allEvents);

  return (
    <Center>
      <Container as="container-for-events" maxW="900px">
        <Box>
          <Flex direction="column" align="center">
            <Heading mt="10" color="yellow.500">
              {username} Events
            </Heading>
            {userRole === "Manager" && (
              <Link to="/create">
                <Button mt="10" backgroundColor="yellow.500">
                  Create an Event
                </Button>
              </Link>
            )}
          </Flex>
        </Box>
        <Center>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="4" mt="4">
            {allEvents.map((event) => (
              <Box
                key={event.id}
                border="1px solid black"
                borderRadius="md"
                p="4"
                onClick={() => handleEventDetails(event.id)}
                cursor="pointer"
              >
                <Box as="event-card" key={event.id}>
                  <Heading as="h4" size="md">
                    {event.event_title}
                  </Heading>
                  <Text>{event.general_notes}</Text>
                  <Text>
                    {dayjs(event.start_time).format("MMMM D, YYYY h:mm A")}-
                    {dayjs(event.end_time).format("h:mm A")}
                  </Text>
                  <Text>{event.privacy}</Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Center>
      </Container>
    </Center>
  );
};

export default SearchEvents;
