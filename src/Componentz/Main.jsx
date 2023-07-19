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
  Checkbox,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

export const Main = ({ username, token }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}event/list/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setEvents(res.data);
      });
  }, [token]);

  console.log(events);

  return (
    <Flex as="main" role="main" direction="column" flex="2" py="6">
      <Container maxW="900px" flex="1">
        <Box>
          <Center>
            <Flex direction="column" align="center">
              <Heading color="yellow.200">UPCOMING EVENTS</Heading>
              <Text color="yellow.200">{username}</Text>
              <Input
                my="8"
                variant="filled"
                placeholder="Search Event"
                size="md"
              />
            </Flex>
          </Center>
        </Box>
        <Grid templateColumns="1fr 1fr" gap={4}>
          <Box>
            <Center>
              <Link to="/create-event">
                <Button>CREATE AN EVENT</Button>
              </Link>
            </Center>
          </Box>
          <Center>
            <Flex direction="column">
              <Box as="event-card">
                {events.map((event) => (
                  <>
                    <Text>{event.event_title}</Text>
                    <Text>{event.general_notes}</Text>
                    <Text>
                      {dayjs(event.start_time).format("MMMM D, YYYY h:mm A")} -
                      {dayjs(event.end_time).format("h:mm A")}
                    </Text>
                    <Text>{event.event_organizer}</Text>
                    <Text>{event.event_organizer}</Text>
                    <Text>{event.privacy}</Text>
                  </>
                ))}
              </Box>
            </Flex>
          </Center>
        </Grid>
      </Container>
    </Flex>
  );
};
