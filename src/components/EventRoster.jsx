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
} from "@chakra-ui/react";
import MapBox from "./MapBox";

const EventRoster = ({ token, username, userRole, orgDetails }) => {
  const [eventRoster, setEventRoster] = useState("");

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
        setEventRoster(res.data);
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
          <Avatar
            mt="5"
            size="md"
            // name={attendee}
            // src="https://example.com/avatar.jpg"
          />
          <Box>
            <Text color="yellow.200" mt="5">
              {eventRoster.event_attendees}
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default EventRoster;
