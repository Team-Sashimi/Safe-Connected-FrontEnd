// https://safe-connected.onrender.com/event/organizer/list/

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
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import MapBox from "./MapBox";

const ManagerEvents = ({ token, username, userRole, orgDetails }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const navigate = useNavigate();

  const [managerEvents, setManagerEvents] = useState([]);
  const [clientEvents, setClientEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}event/organizer/list/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setManagerEvents(res.data);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(`${baseURL}client/event/list/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setClientEvents(res.data);
      });
  }, [token]);

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
  };

  console.log(clientEvents);
  console.log(orgDetails);

  return (
    <>
      <Center bgColor="gray.800" h="92vh">
        {userRole === "Manager" && (
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="5" mt="10">
            {managerEvents.map((event) => (
              <Box
                key={event.id}
                display="flex"
                alignItems="center"
                borderLeft="1px solid white"
                pl="4"
                m="10"
              >
                <br></br>
                <Avatar
                  size="xl"
                  name={username}
                  mb="10"
                  // src={fileUpload}
                />
                <Box ml="4">
                  {" "}
                  <Heading color="whiteAlpha.800" as="h4" size="md">
                    {event.event_title}
                  </Heading>
                  <Text color="whiteAlpha.800">{event.general_notes}</Text>
                  <Text color="whiteAlpha.800">
                    {dayjs(event.event_date).format("MMMM D, YYYY")}
                    <br />
                    {event.start_time} - {event.end_time}
                    <br />
                  </Text>
                  <Text color="whiteAlpha.800">{event.privacy}</Text>
                  <Heading
                    onClick={() => handleEventDetails(event.id)}
                    cursor="pointer"
                    size="md"
                    mt="5"
                    color="yellow.200"
                  >
                    LEARN MORE
                  </Heading>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}

        {userRole === "Client" && (
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="5" mt="10">
            {clientEvents.map((event) => (
              <Box
                key={event.id}
                display="flex"
                alignItems="center"
                borderLeft="1px solid white"
                pl="4"
                m="10"
              >
                <br></br>
                <Avatar
                  size="xl"
                  name={username}
                  mb="10"
                  // src={fileUpload}
                />
                <Box ml="4">
                  {" "}
                  <Heading color="whiteAlpha.800" as="h4" size="md">
                    {event.event_title}
                  </Heading>
                  <Text color="whiteAlpha.800">{event.general_notes}</Text>
                  <Text color="whiteAlpha.800">
                    {dayjs(event.event_date).format("MMMM D, YYYY")}
                    <br />
                    {event.start_time} - {event.end_time}
                    <br />
                  </Text>
                  <Text color="whiteAlpha.800">{event.privacy}</Text>
                  <Heading
                    onClick={() => handleEventDetails(event.id)}
                    cursor="pointer"
                    size="md"
                    mt="5"
                    color="yellow.200"
                  >
                    LEARN MORE
                  </Heading>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Center>
    </>
  );
};

export default ManagerEvents;
