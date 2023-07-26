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
import EventRoster from "./EventRoster";
import moment from "moment";

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

  const startTime = moment(eventDetails.start_time, "HH:mm:ss");
  const endTime = moment(eventDetails.end_time, "HH:mm:ss");

  const formattedStartTime = startTime.format("H:mm");
  const formattedEndTime = endTime.format("HH:mm A");
  return (
    <>
      <Center bgColor="gray.800" h="92vh">
        <Box width="400px" height="500px" p="4" borderRadius="md">
          <Center>
            <Box>
              <Center>
                <Avatar size="xl" name={username} mb="5" />
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
          <br></br>
          <Text color="yellow.200">
            {formattedStartTime} - {formattedEndTime}
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

        <Box>
          <MapBox
            token={token}
            username={username}
            eventAddress={eventAddress}
            eventStNumber={eventStNumber}
            eventStreet={eventStreet}
          />
          <EventRoster token={token} />
        </Box>

        <Box></Box>
      </Center>
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

//* {dayjs(eventDetails.start_time).format("h:mm")}- {dayjs(eventDetails.end_time).format("h:mm A")}
