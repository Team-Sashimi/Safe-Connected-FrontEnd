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
  const [progress, setProgress] = useState(0);

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
        setProgress(res.data.max_attendees);
      });
  }, [token]);

  const formatToRegularTime = (militaryTime) => {
    const [hours, minutes] = militaryTime.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
                  {/* <Heading size="md" color="yellow.200">
                    {orgDetails.phone}
                  </Heading> */}
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
            {eventDetails.start_time && eventDetails.end_time ? (
              <Text color="yellow.200">
                {formatToRegularTime(eventDetails.end_time)} -{" "}
                {formatToRegularTime(eventDetails.start_time)}
              </Text>
            ) : (
              <Text color="yellow.200">Time not available</Text>
            )}
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
              <Link to={`/edit-event/${eventID}`}>
                <Button m="3">Edit</Button>
              </Link>
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
          <EventRoster token={token} progress={progress} userRole={userRole} />
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
