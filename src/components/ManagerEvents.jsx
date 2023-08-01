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
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const eventsToDisplay = userRole === "Manager" ? managerEvents : clientEvents;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventsToDisplay.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const formatToRegularTime = (militaryTime) => {
    const [hours, minutes] = militaryTime.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <>
      <SimpleGrid
        columns="1"
        rows="3"
        h="100vh"
        alignContent="center"
        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
      >
        {currentEvents.map((event) => (
          <Box
            key={event.id}
            display="flex"
            alignItems="center"
            borderLeft="1px solid white"
            pl="4"
            m="10"
          >
            <br />
            <Box ml="4">
              {" "}
              <Heading color="whiteAlpha.800" as="h4" size="md" mb="2">
                {event.event_title}
              </Heading>
              <Text fontSize="12px" color="whiteAlpha.800" mb="2">
                {event.general_notes}
              </Text>
              <Text fontSize="10px" fontWeight="bold" color="whiteAlpha.800">
                {dayjs(event.event_date).format("MMMM D, YYYY")}
              </Text>
              <Text mt="3" color="whiteAlpha.800">
                {formatToRegularTime(event.start_time)} -{" "}
                {formatToRegularTime(event.end_time)}
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
                EDIT
              </Heading>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Center>
        <Flex mt="5" justifyContent="center">
          <Button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            mr="2"
            colorScheme="teal"
          >
            Previous
          </Button>
          <Button
            disabled={currentEvents.length < eventsPerPage}
            onClick={handleNextPage}
            ml="2"
            colorScheme="teal"
          >
            Next
          </Button>
        </Flex>
      </Center>
    </>
  );
};

export default ManagerEvents;
