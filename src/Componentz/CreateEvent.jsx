import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

const CreateEvent = ({ token, username }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventOrganization, setEventOrganization] = useState("");

  const navigate = useNavigate();

  const baseURL = "https://safe-connected.onrender.com/";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseURL}event/create/`,
        {
          event_title: eventTitle,
          start_time: endTime,
          end_time: startTime,
          general_notes: generalNotes,
          event_organizer: eventOrganizer,
          event_organization: eventOrganization,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setEventTitle("");
        setGeneralNotes("");
        setStartTime("");
        setEventOrganizer("");
        setEventOrganization("");
        setEndTime("");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (userInput, e) => {
    if (userInput === "eventTitle") {
      setEventTitle(e.target.value);
      console.log(eventTitle);
    }
    if (userInput === "generalNotes") {
      setGeneralNotes(e.target.value);
    }
    if (userInput === "endTime") {
      setEndTime(e.target.value);
    }
    if (userInput === "startTime") {
      setStartTime(e.target.value);
      console.log(startTime);
    }
    if (userInput === "eventOrganizer") {
      setEventOrganizer(e.target.value);
    }
    if (userInput === "eventOrganization") {
      setEventOrganization(e.target.value);
    }
  };

  return (
    <>
      <Flex
        as="CreateEvent"
        role="createEvent"
        direction="column"
        flex="2"
        py="6"
      >
        <Container maxW="900px" flex="1">
          <Box>
            <Center>
              <Flex direction="column" align="center">
                <Heading color="yellow.200">CREATE YOUR EVENT HERE</Heading>
                <Text color="yellow.200">{username} ROLE, ORGANIZATION</Text>
                <Box my="8">
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>Event Title</FormLabel>
                      <Input
                        my="2"
                        variant="filled"
                        placeholder="Name of Event"
                        size="md"
                        onChange={(e) => handleChange("eventTitle", e)}
                      />
                      <FormLabel mt="4">General Notes</FormLabel>
                      <Textarea
                        my="2"
                        variant="filled"
                        placeholder="General Notes"
                        size="md"
                        onChange={(e) => handleChange("generalNotes", e)}
                      />
                      <FormLabel mt="4">Start Date & Time:</FormLabel>
                      <Input
                        size="md"
                        type="datetime-local"
                        variant="filled"
                        onChange={(e) => handleChange("startTime", e)}
                      />
                      <FormLabel mt="4">End Date & Time:</FormLabel>
                      <Input
                        size="md"
                        type="datetime-local"
                        variant="filled"
                        onChange={(e) => handleChange("endTime", e)}
                      />
                      <FormLabel mt="4">Organization</FormLabel>
                      <Select
                        variant="filled"
                        placeholder="Event Organization"
                        onChange={(e) => handleChange("eventOrganization", e)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Select>
                      <FormLabel mt="4">Event Organizer</FormLabel>
                      <Select
                        variant="filled"
                        placeholder="Event Leader"
                        onChange={(e) => handleChange("eventOrganizer", e)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Select>
                      <Input
                        cursor="pointer"
                        mt="6"
                        size="md"
                        type="submit"
                        variant="filled"
                      />
                    </FormControl>
                  </form>
                </Box>
                <Box as="event-preview">
                  <Text>{eventTitle}</Text>
                  <Text>{generalNotes}</Text>
                  <Text>{startTime}</Text>
                  <Text>{endTime}</Text>
                </Box>
              </Flex>
            </Center>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default CreateEvent;

//"end_time": "2023-07-18 09:30"
