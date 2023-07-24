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
} from "@chakra-ui/react";
import dayjs from "dayjs";
import ClientSignUp from "./ClientSignUp";

import { Link } from "react-router-dom";

const EventDetails = ({ token, username }) => {
  const [eventDetails, setEventDetails] = useState([]);
  const [eventRoster, setEventRoster] = useState([]);

  const baseURL = "https://safe-connected.onrender.com/";
  const { eventID } = useParams();

  // get request to grab event details
  // post or patch request to sign up

  useEffect(() => {
    axios
      .get(`${baseURL}event/${eventID}/details`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setEventDetails(res.data);
      });
  }, [token]);

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
      <Center m="10">
        <Box
          width="400px"
          height="500px"
          border="1px solid #ccc"
          p="4"
          borderRadius="md"
        >
          <Center>
            <Box border="1px solid" width="300px" height="150px"></Box>
          </Center>
          <Heading as="h4" size="md" mt="10">
            {eventDetails.event_title}
          </Heading>
          <Text>{eventDetails.general_notes}</Text>
          <Text>
            {dayjs(eventDetails.start_time).format("MMMM D, YYYY h:mm A")} -
            {dayjs(eventDetails.end_time).format("h:mm A")}
          </Text>
          <Text>Event type of: {eventDetails.event_type}</Text>
          <Text>
            {eventDetails.street_number} {eventDetails.street_name}
          </Text>
          <Text>
            {eventDetails.city} {eventDetails.zipcode}
          </Text>
          <ClientSignUp token={token} eventID={eventID} />
        </Box>

        {/* Adding the rectangle with a border */}
        <Box
          width="600px"
          height="500px"
          border="2px solid #000"
          borderRadius="md"
          ml="4" // Adjust the margin as per your requirement
        ></Box>
      </Center>

      <Center>
        <Heading as="h4" size="md" mt="10">
          Clients Signed Up
        </Heading>
      </Center>

      <Flex
        direction="column"
        justify="center"
        p={4}
        // bgColor="gray.100"
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
            size="md"
            // name={attendee}
            // src="https://example.com/avatar.jpg"
          />
        </Box>
      </Flex>
      <Center>
        <Text mt="5">{eventRoster.event_attendees}</Text>
      </Center>
    </>
  );
};

export default EventDetails;
