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

export const Main = ({ username, token, userRole }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}event/list/`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setEvents(res.data);
  //     });
  // }, [token]);

  console.log(username);
  console.log(token);
  console.log(userRole);

  return (
    <Center bgColor="gray.800" h="100vh">
      <Flex as="main" role="main" direction="column" flex="2" py="3">
        <Container maxW="900px" flex="1">
          <Box>
            <Center>
              <Avatar
                size="xl"
                name={username}
                mb="10"
                // src="https://example.com/avatar.jpg"
              />
            </Center>
            <Center>
              <Flex direction="column" align="center">
                <Heading color="yellow.200">Welcome! {username}</Heading>
                <Heading mt="4" size="md" color="yellow.200">
                  {userRole} at *Insert Organization*
                </Heading>
              </Flex>
            </Center>
          </Box>
          <Box m="5">
            <Center>
              <Flex align="center">
                {userRole === "Manager" && (
                  <Link to="/clients">
                    <Button backgroundColor="yellow.400" m="4">
                      Clients
                    </Button>
                  </Link>
                )}
                <Link to="/search-events">
                  <Button backgroundColor="yellow.400" m="4">
                    Events
                  </Button>
                </Link>
                <Link to="/account">
                  <Button backgroundColor="yellow.400" m="4">
                    Account
                  </Button>
                </Link>
              </Flex>
            </Center>
          </Box>
        </Container>
      </Flex>
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
