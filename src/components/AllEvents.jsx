import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, useNavigate, useParams } from "react-router-dom";
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
  FormControl,
  FormLabel,
  Textarea,
  Select,
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
import dayjs from "dayjs";

//sign ups

const AllEvents = ({ username, token, userRole, language, orgDetails }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [signUps, setSignUps] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState(null);
  const [publishedFilter, setPublishedFilter] = useState(null);
  const navigate = useNavigate();
  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}${language}/event/client/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setSignUps(res.data);
      })
      .catch((error) => {
        console.log("Error fetching client signed up events:", error);
      });
  }, [token]);

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
    setEventID(eventID);
  };
  console.log(signUps);
  return (
    <>
      <SimpleGrid
        h="100vh"
        alignContent="center"
        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #1E2065 56.45%, #020515 86.14%)"
        columns={1}
        rows={4}
        spacing={1}
      >
        <Box textAlign="center">
          <Heading color="white" as="h1" size="sm">
            You Signed Up For These Events
          </Heading>
        </Box>

        <Box mt="3" overflow="auto" maxHeight="410px">
          <Flex direction="column" justifyContent="center" alignItems="center">
            {signUps
              .filter((event) => {
                if (eventTypeFilter) {
                  return event.event_type === parseInt(eventTypeFilter);
                }
                return true;
              })
              .filter((event) => {
                if (publishedFilter !== null) {
                  return event.privacy === (publishedFilter === "True");
                }
                return true;
              })
              .map((event) => (
                <Box
                  key={event.id}
                  cursor="pointer"
                  p={3}
                  mb="2"
                  bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
                  color="whiteAlpha.800"
                  height="80px"
                  w="200px"
                  boxShadow="md"
                  rounded="md"
                  display="inline-table"
                  onClick={() => handleEventDetails(event.id)}
                >
                  <Heading fontSize="14px">{event.event_title}</Heading>
                  <Text fontWeight="bold" fontSize="10px">
                    {dayjs(event.event_date).format("MM/DD/YYYY")}{" "}
                  </Text>
                </Box>
              ))}
          </Flex>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default AllEvents;

{
  /* <Box mt="5" textAlign="center">
<Heading color="white" as="h1" size="xs">
  Reach out to {orgDetails.org_name}
</Heading>
</Box>
<Flex align="center">

<Avatar
  size="sm"
  src={orgDetails.org_avatar}
  name={orgDetails.member_full_name}
  mr="2"
/>
<span>{orgDetails.org_name}</span>
</Flex> */
}
