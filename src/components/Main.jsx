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
  Avatar,
  InputGroup,
  InputLeftElement,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import SideBar from "./SideBar";
import MainDashBoard from "./MainDashBoard";

export const Main = ({ username, token, userRole, language }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [managerEvents, setManagerEvents] = useState([]);

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

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
  };

  console.log(language);

  return (
    <>
      <Flex
        direction="column"
        marginLeft={["5%", "10%", "15%"]} // Adjust the left margin for different screen sizes
        marginTop="2.5vh"
      >
        <Container h="100%">
          <Flex
            direction="column" // Display the elements beneath each other
            w={["100%", "80%", "500px"]} // Adjust the width for different screen sizes
            h={["150px", "200px", "250px"]}
            borderRadius="15"
            border="solid"
            // borderColor="yellow.200"
            align="flex-end" // Right-align the items horizontally
            justify="center" // Right-align the items vertically
            overflow="hidden" // Prevent content from overflowing
          >
            <Heading mb="1" fontSize="lg" color="yellow.200">
              GETTING STARTED
            </Heading>
            <Text fontSize="small" color="yellow.200">
              Safely register clients.
            </Text>
            <Text fontSize="small" color="yellow.200">
              Create & manage events.
            </Text>
            <Text fontSize="small" color="yellow.200">
              Language translation built in.
            </Text>
          </Flex>
          <Flex
            direction="column" // Display the elements beneath each other
            w={["100%", "80%", "500px"]} // Adjust the width for different screen sizes
            h={["200px", "250px", "300px"]} // Adjust the height to make the accordion smaller
            borderRadius="15"
            border="solid"
            // borderColor="yellow.200"
            align="flex-end" // Right-align the items horizontally
            justify="center" // Right-align the items vertically
            overflow="hidden" // Prevent content from overflowing
          >
            <Heading mb="3" fontSize="lg" color="yellow.200">
              YOUR EVENTS
            </Heading>
            {managerEvents.slice(0, 5).map((event) => (
              <Text
                fontSize="small"
                color="whiteAlpha.500"
                key={event.id}
                ml="auto"
              >
                {event.event_title}
              </Text>
            ))}
          </Flex>
          <Flex
            align="flex-end" // Right-align the items horizontally
            justify="flex-end" // Right-align the items vertically
            overflow="hidden"
          ></Flex>
        </Container>
      </Flex>
    </>
  );
};

{
  /* <Flex
direction="column" // Display the elements beneath each other
w={["100%", "80%", "500px"]} // Adjust the width for different screen sizes
h={["150px", "200px", "250px"]}
borderRadius="15"
border="solid"
// borderColor="yellow.200"
align="flex-end" // Right-align the items horizontally
justify="center" // Right-align the items vertically
>
<Heading mb="3" fontSize="lg" color="yellow.200">
  YOUR EVENTS{" "}
</Heading>
{managerEvents.slice(0, 5).map((event) => (
  <Text
    fontSize="small"
    color="yellow.200"
    key={event.id}
    ml="auto"
  >
    {event.event_title}
  </Text>
))}
</Flex> */
}
