import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Container,
  Box,
  Heading,
  Input,
  Center,
  Text,
  Button,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import MapBoxAll from "./MapBoxAll";

import { PhoneIcon, AddIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import dayjs from "dayjs";

const SearchEvents = ({ token, username, userRole }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [allStreets, setAllStreets] = useState([]);
  const navigate = useNavigate();
  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}event/all`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setAllEvents(res.data);
        const streetNamesArray = res.data.map((e) => e.street_name);
        setAllStreets(streetNamesArray);
      });
  }, [token]);

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
  };

  console.log(allEvents);
  // console.log(allStreets);

  return (
    <Center bgColor="gray.800" h="100%">
      <Container as="container-for-events" h="100%" maxW="900px">
        <MapBoxAll token={token} username={username} allStreets={allStreets} />
        <Box>
          <Flex m="4" direction="column" align="center">
            <Heading mt="5" color="yellow.200">
              {username} Events
            </Heading>
            <Flex mt="5">
              <Box mr="2">
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Date
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Most Recent</MenuItem>
                    <MenuItem>Most Recently Added</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Flex>
            {userRole === "Manager" && (
              <Link to="/create">
                <Button mt="5" backgroundColor="yellow.200">
                  Create an Event
                </Button>
              </Link>
            )}
          </Flex>
        </Box>
        <Center>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="5" mt="10">
            {allEvents.map((event) => (
              <Box key={event.id} borderLeft="1px solid white" pl="4" m="10">
                <Box as="event-card" key={event.id}>
                  <Heading color="whiteAlpha.800" as="h4" size="md">
                    {event.event_title}
                  </Heading>
                  <Text color="whiteAlpha.800">{event.general_notes}</Text>
                  <Text color="whiteAlpha.800">
                    {dayjs(event.event_date).format("MMMM D, YYYY")}
                    <br></br>
                    {event.start_time} - {event.end_time}
                    <br></br>
                    {/* Start Time: {dayjs(event.start_time).format("HH:mm")} */}
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
        </Center>
      </Container>
    </Center>
  );
};

export default SearchEvents;
