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
  Avatar,
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

  console.log(username);
  console.log(token);

  return (
    <Center h="80vh">
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <Flex as="main" role="main" direction="column" flex="2" py="6">
          <Container maxW="900px" flex="1">
            <Box>
              <Center>
                <Flex direction="column" align="center">
                  <Heading color="yellow.500">Welcome! {username} </Heading>
                  <Heading mt="4" size="md" color="yellow.500">
                    Please select from options below.
                  </Heading>
                </Flex>
              </Center>
            </Box>
            <Box m="5">
              <Center>
                <Flex align="center">
                  <Link to="/clients">
                    <Button m="4">Clients</Button>
                  </Link>
                  <Link to="/search-events">
                    <Button m="4">Events</Button>
                  </Link>
                </Flex>
              </Center>
            </Box>
          </Container>
        </Flex>
        {/* Second Column */}
        <Flex
          direction="column"
          justify="center"
          p={4}
          bgColor="gray.100"
          w="100%"
          h="100%"
        >
          <Box
            w="100%"
            h="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar
              size="xl"
              name={username}
              // src="https://example.com/avatar.jpg"
            />
            <Heading mt={4}>{username}</Heading>
            <Box mt={2}>
              <p>Lorem ipsum dolor sit amet.</p>
            </Box>
          </Box>
        </Flex>
      </Grid>
    </Center>
  );
};

{
  /* <Center>
<Flex direction="column">
  {events.map((event) => (
    <>
      <Box maxW="400px" as="event-card" key={event.title}>
        <Heading as="h4" size="md">
          {event.event_title}
        </Heading>
        <Text>{event.general_notes}</Text>
        <Text>
          {dayjs(event.start_time).format("MMMM D, YYYY h:mm A")} -
          {dayjs(event.end_time).format("h:mm A")}
        </Text>
        <Text>{event.event_organization}</Text>
        <Text>{event.privacy}</Text>
      </Box>
    </>
  ))}
</Flex>
</Center> */
}
