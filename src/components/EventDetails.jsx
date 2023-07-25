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
import dayjs from "dayjs";
import ClientSignUp from "./ClientSignUp";
import EditEventDetails from "./EditEventDetails";
import DeleteEvent from "./DeleteEvent";
import MapBox from "./MapBox";

import { Link } from "react-router-dom";

const EventDetails = ({ token, username, userRole, orgDetails }) => {
  const [eventDetails, setEventDetails] = useState([]);
  const [eventRoster, setEventRoster] = useState([]);
  const [eventAddress, setEventAddress] = useState("");
  const [eventStNumber, setEventStNumber] = useState("");
  const [eventStreet, setEventStreet] = useState("");
  const baseURL = "https://safe-connected.onrender.com/";
  const { eventID } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}event/${eventID}/details`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setEventStNumber(res.data.street_number);
        setEventStreet(res.data.street_name);
        setEventAddress(res.data.full_address);
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

  return (
    <>
      <Center bgColor="gray.800" h="100vh">
        <Box
          width="400px"
          height="500px"
          // border="1px solid #ccc"
          p="4"
          borderRadius="md"
        >
          <Center>
            <Box>
              <Center>
                <Avatar
                  size="xl"
                  name={username}
                  mb="5"
                  // src="https://example.com/avatar.jpg"
                />
              </Center>
              <Center>
                <Flex direction="column" align="center">
                  <Heading size="md" color="yellow.200">
                    {orgDetails.org_name}
                  </Heading>
                  <Heading size="md" color="yellow.200">
                    {orgDetails.phone}
                  </Heading>
                </Flex>
              </Center>
            </Box>
          </Center>
          <Heading color="yellow.200" as="h4" size="md" mt="10">
            {eventDetails.event_title}
          </Heading>
          <Text color="yellow.200">{eventDetails.general_notes}</Text>
          <Text color="yellow.200">{eventDetails.full_address}</Text>
          <br></br>
          <Text color="yellow.200">
            {dayjs(eventDetails.start_time).format("MMMM D, YYYY")}
            <br></br>
            {dayjs(eventDetails.start_time).format("h:mm")}-
            {dayjs(eventDetails.end_time).format("h:mm A")}
          </Text>
          <Text color="yellow.200">
            Event type of: {eventDetails.event_type}
          </Text>
          <br></br>
          <Text color="yellow.200">
            {eventDetails.street_number} {eventDetails.street_name}
          </Text>
          <Text color="yellow.200">
            {eventDetails.city} {eventDetails.zipcode}
          </Text>
          {userRole === "Client" && (
            <ClientSignUp token={token} eventID={eventID} />
          )}
          {userRole === "Manager" && (
            <>
              <EditEventDetails token={token} eventID={eventID} />
              <DeleteEvent token={token} eventID={eventID} />
            </>
          )}
        </Box>

        <Box
        // width="600px"
        // height="400px"
        // border="2px solid #eee"
        // borderRadius="md"
        // ml="4"
        >
          <MapBox
            token={token}
            username={username}
            eventAddress={eventAddress}
            eventStNumber={eventStNumber}
            eventStreet={eventStreet}
          />
        </Box>
      </Center>

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
      <Center></Center>
    </>
  );
};

export default EventDetails;

// {
//   allEvents.map((event) => (
//     <Box
//       key={event.id}
//       border="1px solid black"
//       borderRadius="md"
//       p="4"
//       onClick={() => handleEventDetails(event.id)}
//       cursor="pointer"
//     >
//       <Box as="event-card" key={event.id}>
//         <Heading as="h4" size="md">
//           {event.event_title}
//         </Heading>
//         <Text>{event.general_notes}</Text>
//         <Text>
//           {dayjs(event.start_time).format("MMMM D, YYYY h:mm A")}-
//           {dayjs(event.end_time).format("h:mm A")}
//         </Text>
//         <Text>{event.privacy}</Text>
//       </Box>
//     </Box>
//   ));
// }
