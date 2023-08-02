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
  Progress,
} from "@chakra-ui/react";

const EventRoster = ({ token, username, userRole, orgDetails, progress }) => {
  const [eventRoster, setEventRoster] = useState([]);
  const [signUpCount, setSignUpCount] = useState(0);
  const baseURL = "https://safe-connected.onrender.com/";
  const { eventID } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}event/roster/${eventID}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setEventRoster(res.data.event_attendees);
        setSignUpCount(res.data.event_attendees.length);
      });
  }, [token]);

  console.log(progress);
  console.log(userRole);
  console.log(eventRoster);

  return (
    <>
      <Flex
        direction="column"
        justify="center"
        p={4}
        // bgColor="gray.800"
        w="100%"
        h="auto"
      >
        <Box
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading size="xs" color="yellow.200">
            People Who Signed Up
          </Heading>
          {userRole === "Client" && (
            <Box mt={4}>
              {/* The progress bar */}
              <Progress
                value={(eventRoster.length / progress) * 150}
                colorScheme="yellow"
                size="lg"
                height="32px"
                width={{ base: "100%", sm: "70%", md: "50%", lg: "600px" }}
              />
              <Center>
                <Text fontSize="10px" mt={2} color="white">
                  {signUpCount} out of {progress} people have signed up for this
                  event.
                </Text>
              </Center>
            </Box>
          )}
          {userRole === "Manager" && (
            <Flex>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexWrap="nowrap"
              >
                {eventRoster.length > 0 ? (
                  eventRoster.map((event_attendees, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mx="8px"
                    >
                      <Flex direction="column" alignItems="center">
                        <Avatar
                          size="sm"
                          name={event_attendees}
                          mt="4"
                          mb="1"
                        />

                        <Text color="whiteAlpha.800" as="h4" fontSize="10px">
                          {event_attendees}
                        </Text>
                      </Flex>
                    </Box>
                  ))
                ) : (
                  <Text fontSize="xs" color="white" mt="2">
                    No one has signed up yet
                  </Text>
                )}
              </Box>
            </Flex>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default EventRoster;
