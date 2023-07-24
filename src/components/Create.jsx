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
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [language, setLanguage] = useState("");
  const [capacity, setCapacity] = useState("");

  const navigate = useNavigate();
  const baseURL = "https://safe-connected.onrender.com/";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseURL}event/create/`,
        {
          event_title: eventTitle,
          general_notes: generalNotes,
          start_time: endTime,
          end_time: startTime,
          street_number: streetNumber,
          street_name: streetName,
          city: city,
          zipcode: zip,
          privacy: privacy,
          event_language: language,
          max_attendees: capacity,
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
        setEndTime("");
        setStreetNumber("");
        setStreetName("");
        setCity("");
        setZip("");
        setPrivacy("");
        setLanguage("");
        setCapacity("");
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
    if (userInput === "streetNumber") {
      setStreetNumber(e.target.value);
    }
    if (userInput === "streetName") {
      setStreetName(e.target.value);
    }
    if (userInput === "city") {
      setCity(e.target.value);
    }
    if (userInput === "zip") {
      setZip(e.target.value);
    }
    if (userInput === "privacy") {
      setPrivacy(e.target.value);
    }
    if (userInput === "language") {
      setLanguage(e.target.value);
    }
    if (userInput === "capacity") {
      setCapacity(e.target.value);
    }
  };

  return (
    <>
      <Center bgColor="gray.800" h="100vh">
        <Flex my="8" maxWidth="800px">
          {/* First Column */}
          <Box m="4" mr="150px">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel color="yellow.200">Event Title</FormLabel>
                <Input
                  my="2"
                  // variant="filled"
                  placeholder="Name of Event"
                  size="md"
                  color="whiteAlpha.600"
                  onChange={(e) => handleChange("eventTitle", e)}
                />
                <FormLabel mt="4" color="yellow.200">
                  General Notes
                </FormLabel>
                <Textarea
                  my="2"
                  color="whiteAlpha.600"
                  placeholder="General Notes"
                  size="md"
                  onChange={(e) => handleChange("generalNotes", e)}
                />
                <FormLabel color="yellow.200" mt="4">
                  Select Language
                </FormLabel>
                <Select
                  color="whiteAlpha.600"
                  placeholder="Languages"
                  onChange={(e) => handleChange("language", e)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Select>
                <FormLabel color="yellow.200" mt="4">
                  Is your event private?
                </FormLabel>
                <Select
                  placeholder="Choose below"
                  color="whiteAlpha.600"
                  onChange={(e) => handleChange("privacy", e)}
                >
                  <option value="True">Yes</option>
                  <option value="False">No</option>
                </Select>
                <FormLabel color="yellow.200" mt="4">
                  Start Date & Time:
                </FormLabel>
                <Input
                  color="whiteAlpha.600"
                  size="md"
                  type="datetime-local"
                  onChange={(e) => handleChange("startTime", e)}
                />
                <FormLabel color="yellow.200" mt="4">
                  End Date & Time:
                </FormLabel>
                <Input
                  color="whiteAlpha.600"
                  size="md"
                  type="datetime-local"
                  onChange={(e) => handleChange("endTime", e)}
                />
              </FormControl>
            </form>
          </Box>
          {/* Second Column */}
          <Box ml="4">
            <FormControl>
              <FormLabel color="yellow.200" mt="4">
                Street Number
              </FormLabel>
              <Input
                size="md"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("streetNumber", e)}
              />
              <FormLabel color="yellow.200" mt="4">
                Street Name
              </FormLabel>
              <Input
                size="md"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("streetName", e)}
              />
              <FormLabel color="yellow.200" mt="4">
                City
              </FormLabel>
              <Input
                size="md"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("city", e)}
              />
              <FormLabel color="yellow.200" mt="4">
                Zipcode
              </FormLabel>
              <Input
                size="md"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("zip", e)}
              />
              <FormLabel color="yellow.200" mt="4">
                Capacity
              </FormLabel>
              <Input
                size="md"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("capacity", e)}
              />
            </FormControl>
            <Button
              mt="6"
              size="md"
              type="submit"
              onClick={handleSubmit}
              cursor="pointer"
            >
              Submit
            </Button>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default CreateEvent;
