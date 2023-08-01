import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  SimpleGrid,
  Box,
  Container,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Avatar,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import dayjs from "dayjs";
const EventsAndClients = ({ token, username, userRole, language }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [managerEvents, setManagerEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [eventID, setEventID] = useState("");
  const [memberID, setMemberID] = useState("");
  const [clientEvents, setClientEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}${language}/event/organizer/list/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setManagerEvents(res.data);
        axios
          .get(`${baseURL}org/1/clients/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            setMembers(res.data);
          })
          .catch((error) => {
            console.log("Error fetching clients data:", error);
          });
      })
      .catch((error) => {
        console.log("Error fetching manager events:", error);
      });
  }, [token]);

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
    setEventID(eventID);
  };

  const handleMemberProfile = (memberID) => {
    console.log(`hi this is a member with an id of: ${memberID}`);
    navigate(`/member/${memberID}`);
    setEventID(eventID);
  };

  return (
    <Flex
      flexDirection="column"
      bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
      h="100vh"
      pt="60px"
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} m="5" spacing="10px">
        {/* MiniStatistics Card */}
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          // bg="blue.500"
          boxShadow="md"
          borderRadius="lg"
          p="1px"
        >
          <Text
            fontSize="md"
            color="whiteAlpha.800"
            fontWeight="bold"
            mb="3"
            pb="2px"
          >
            Your Events, Your Members.
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          // bg="blue.500"
          boxShadow="md"
          borderRadius="lg"
          ml="20px"
        >
          <Spacer></Spacer>
          <Spacer></Spacer>
          {userRole === "Manager" && (
            <TableContainer w="30vh">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th color="yellow.200" fontSize="14px">
                      My Events
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {managerEvents.map((event) => (
                    <Tr
                      key={event.id}
                      onClick={() => handleEventDetails(event.id)}
                    >
                      <Td color="gray.400" fontSize="12px" fontWeight="bold">
                        {event.event_title}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}

          {userRole === "Client" && (
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th color="yellow.200" fontSize="14px">
                      Events I'm Signed Up For:
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {clientEvents.map((event) => (
                    <Tr
                      key={event.id}
                      onClick={() => handleEventDetails(event.id)}
                    >
                      <Td color="gray.400" fontSize="12px" fontWeight="bold">
                        {event.event_title}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          <Spacer></Spacer>
          <Spacer></Spacer>

          {userRole === "Manager" && (
            <TableContainer w="35vh" mt="10">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th color="yellow.200" fontSize="14">
                      Organization Members
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {members.map((member) => (
                    <Tr
                      key={member.id}
                      onClick={() => handleMemberProfile(member.member)}
                    >
                      <Td
                        _hover={{ color: "yellow" }} // Apply the hover effect using _hover prop
                        color="gray.400"
                        fontSize="12px"
                        fontWeight="bold"
                      >
                        <Flex align="center">
                          {" "}
                          {/* Wrap Avatar and name inside Flex */}
                          <Avatar
                            size="sm"
                            src={member.user_avatar}
                            name={member.member_full_name}
                            mr="2"
                          />
                          <span>{member.member_full_name}</span>
                          {/* <span>{member.member}</span> */}
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

export default EventsAndClients;
