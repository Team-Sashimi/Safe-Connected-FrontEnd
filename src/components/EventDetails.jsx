import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Heading, Center, Text, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import ClientSignUp from "./ClientSignUp";

import { Link } from "react-router-dom";

const EventDetails = ({ token, username }) => {
  const [eventDetails, setEventDetails] = useState([]);

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

  return (
    <>
      <Center m="10">
        <Box>
          <Heading as="h4" size="md">
            Details for event with an id of: {eventID}
          </Heading>
          <Text>{eventDetails.event_title}</Text>
          <Text>{eventDetails.general_notes}</Text>
          <Text>
            {dayjs(eventDetails.start_time).format("MMMM D, YYYY h:mm A")} -
            {dayjs(eventDetails.end_time).format("h:mm A")}
          </Text>
          <Text>{eventDetails.event_type}</Text>
          <Text>
            {eventDetails.street_number} {eventDetails.street_name}
          </Text>
          <Text>
            {eventDetails.city}, {eventDetails.zipcode}
          </Text>
        </Box>
        <ClientSignUp token={token} eventID={eventID} />
      </Center>
    </>
  );
};

export default EventDetails;
