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
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import dayjs from "dayjs";

const SearchEvents = ({ token, username }) => {
  const [allEvents, setAllEvents] = useState([]);
  const navigate = useNavigate();
  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}event/search/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setAllEvents(res.data);
      });
  }, [token]);

  return (
    <Flex as="search-events" role="main" direction="column" flex="2" py="6">
      <Container as="container-for-events" maxW="900px" flex="1">
        <Box>
          <Flex direction="column" align="center">
            <Heading color="yellow.500">THIS PAGE GETS ALL EVENTS</Heading>
            <Input
              my="8"
              variant="filled"
              placeholder="Search Event"
              size="md"
            />
          </Flex>
        </Box>
        <Center>
          <Flex direction="column">
            <Box border="1px solid black" borderRadius="md" p="4" m="4">
              {allEvents.map((event) => (
                <Box border="1px solid black" borderRadius="md" p="4" m="10">
                  <Box as="event-card" key={event.id}>
                    <Heading as="h4" size="md">
                      {event.event_title}
                    </Heading>
                    <Text>{event.general_notes}</Text>
                    <Text>
                      {dayjs(event.start_time).format("MMMM D, YYYY h:mm A")} -
                      {dayjs(event.end_time).format("h:mm A")}
                    </Text>
                    <Text>{event.event_organizer}</Text>
                    <Text>{event.event_organization}</Text>
                    <Text>{event.privacy}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Flex>
        </Center>
      </Container>
    </Flex>
  );
};

export default SearchEvents;
