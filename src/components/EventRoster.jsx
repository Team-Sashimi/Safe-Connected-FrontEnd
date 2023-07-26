import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Center,
  Text,
  Button,
  Flex,
  Avatar,
  InputGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import MapBox from "./MapBox";

const EventRoster = ({ token, username, userRole, orgDetails }) => {
  const [eventRoster, setEventRoster] = useState([]);

  const baseURL = "https://safe-connected.onrender.com/";
  const { eventID } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}event/roster/${eventID}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setEventRoster(res.data.event_attendees);
      });
  }, [token]);

  console.log(eventRoster);

  return (
    <>
      <Flex
        direction="column"
        justify="center"
        p={4}
        bgColor="gray.800"
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
          <Heading size="md" color="yellow.200">
            People Who Signed Up
          </Heading>

          <Box as="attendees">
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="5" mt="10">
              {eventRoster.length > 0 ? (
                eventRoster.map((event_attendees, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    borderLeft="1px solid white"
                    pl="4"
                    m="10"
                  >
                    <Avatar size="xl" name={event_attendees} mb="10" />
                    <Box ml="4">
                      <Heading color="whiteAlpha.800" as="h4" size="md">
                        {event_attendees}
                      </Heading>
                    </Box>
                  </Box>
                ))
              ) : (
                <Text color="white">No one has signed up yet</Text>
              )}
            </SimpleGrid>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default EventRoster;
