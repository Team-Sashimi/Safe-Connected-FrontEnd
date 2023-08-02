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
  Container,
  Skeleton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import ClientSignUp from "./ClientSignUp";
import EditEventDetails from "./EditEventDetails";
import DeleteEvent from "./DeleteEvent";
import MapBox from "./MapBox";
import EventRoster from "./EventRoster";
import moment from "moment";
import { Link } from "react-router-dom";

const EventDetails = ({ token, username, userRole, orgDetails, language }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [eventRoster, setEventRoster] = useState([]);
  const [eventAddress, setEventAddress] = useState("");
  const [eventStNumber, setEventStNumber] = useState("");
  const [eventStreet, setEventStreet] = useState("");
  const [progress, setProgress] = useState(0);

  const baseURL = "https://safe-connected.onrender.com/";
  const { eventID } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}${language}/event/${eventID}/details`, {
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
    <Flex
      bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
      direction="column"
      h="100vh"
      alignItems="center"
      overflow="auto"
      justifyContent="center"
    >
      <Flex
        mt="50px"
        direction="column"
        w="320px"
        maxH="600px"
        borderRadius={15}
        mb="5"
        align="center"
        justify="center"
        overflow="auto"
      >
        {!eventDetails ? (
          <>
            <Skeleton height="20px" width="80%" mb="10px" />
            <Skeleton height="80px" width="80%" mb="10px" />
            <Skeleton height="15px" width="50%" mb="10px" />
            <Skeleton height="15px" width="70%" mb="10px" />
            <Skeleton height="15px" width="60%" mb="10px" />
          </>
        ) : (
          <>
            <Heading align="center" color="yellow.200" as="h4" size="md">
              {eventDetails.event_title}
            </Heading>
            <Center>
              <Text
                mt="2"
                fontSize="14"
                lineHeight="17px"
                align="center"
                mb="2"
                color="whiteAlpha.800"
              >
                {eventDetails.general_notes}
              </Text>
            </Center>

            <Text fontSize="14px" fontWeight="bold" color="yellow.200">
              {dayjs(eventDetails.event_date).format("MM/DD/YYYY")}{" "}
            </Text>
            <Text fontSize="12px" fontStyle="bold" color="yellow.200">
              {eventDetails.start_time && eventDetails.end_time ? (
                <Text fontStyle="bold" color="yellow.200">
                  {formatToRegularTime(eventDetails.start_time)} -{" "}
                  {formatToRegularTime(eventDetails.end_time)}
                </Text>
              ) : (
                <Text color="yellow.200">Time not available</Text>
              )}
            </Text>

            <Text fontSize="12px" color="yellow.200"></Text>
            <Flex>
              {userRole === "Manager" && (
                <>
                  <Link to={`/edit-event/${eventID}`}>
                    <Button size="xs" m="3">
                      Edit
                    </Button>
                  </Link>
                  <DeleteEvent token={token} eventID={eventID} />
                </>
              )}
              {userRole === "Client" && (
                <ClientSignUp token={token} eventID={eventID} />
              )}
            </Flex>

            <Flex justifyContent="center" mt="1">
              <Center flexDirection="column">
                <MapBox
                  token={token}
                  username={username}
                  eventAddress={eventAddress}
                  eventStNumber={eventStNumber}
                  eventStreet={eventStreet}
                />
                <Text mt="2" fontSize="12px" color="whiteAlpha.800">
                  {eventDetails.street_number} {eventDetails.street_name}{" "}
                  {eventDetails.city}, {eventDetails.state}{" "}
                  {eventDetails.zipcode}
                </Text>
              </Center>
            </Flex>
            <EventRoster
              token={token}
              progress={progress}
              userRole={userRole}
            />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default EventDetails;

// <Center bgColor="gray.800" h="92vh">
//         <Box width="400px" height="500px" p="4" borderRadius="md">
//           <Center>
//             <Box>
//               <Center>
//                 <Avatar size="xl" name={username} mb="5" />
//               </Center>
//               <Center>
//                 <Flex direction="column" align="center">
//                   <Heading size="md" color="yellow.200">
//                     {orgDetails.org_name}
//                   </Heading>
//                   {/* <Heading size="md" color="yellow.200">
//                     {orgDetails.phone}
//                   </Heading> */}
//                 </Flex>
//               </Center>
//             </Box>
//           </Center>
//           <Heading color="yellow.200" as="h4" size="md" mt="10">
//             {eventDetails.event_title}
//           </Heading>
//           <Text color="yellow.200">{eventDetails.general_notes}</Text>
//           <br></br>
//           <Text color="yellow.200">
//             {eventDetails.start_time && eventDetails.end_time ? (
//               <Text color="yellow.200">
//                 {formatToRegularTime(eventDetails.end_time)} -{" "}
//                 {formatToRegularTime(eventDetails.start_time)}
//               </Text>
//             ) : (
//               <Text color="yellow.200">Time not available</Text>
//             )}
//           </Text>
//           <br></br>
//           <Text color="yellow.200">
//             {eventDetails.street_number} {eventDetails.street_name}
//           </Text>
//           <Text color="yellow.200">
//             {eventDetails.city} {eventDetails.zipcode}
//           </Text>
//           {userRole === "Client" && (
//             <ClientSignUp token={token} eventID={eventID} />
//           )}
//           {userRole === "Manager" && (
//             <>
//               <Link to={`/edit-event/${eventID}`}>
//                 <Button m="3">Edit</Button>
//               </Link>
//               <DeleteEvent token={token} eventID={eventID} />
//             </>
//           )}
//         </Box>

//         <Box>
//           <MapBox
//             token={token}
//             username={username}
//             eventAddress={eventAddress}
//             eventStNumber={eventStNumber}
//             eventStreet={eventStreet}
//           />
//           <EventRoster token={token} progress={progress} userRole={userRole} />
//         </Box>

//         <Box></Box>
//       </Center>
