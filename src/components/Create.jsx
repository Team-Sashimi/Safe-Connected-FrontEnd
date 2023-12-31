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
  Alert,
  AlertIcon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Spinner,
  FormErrorMessage,
  Skeleton,
} from "@chakra-ui/react";

import SearchMapBox from "./SearchMapBox";

const CreateEvent = ({ token, username }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [language, setLanguage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const { eventID } = useParams();
  const [currentPage, setCurrentPage] = useState(null);
  const [isDraftSaving, setIsDraftSaving] = useState(true);
  const [eventType, setEventType] = useState(0);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const baseURL = "https://safe-connected.onrender.com/";
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${baseURL}event/create/`,
        {
          event_title: eventTitle,
          general_notes: generalNotes,
          event_date: eventDate,
          start_time: startTime,
          end_time: endTime,
          street_number: selectedSuggestion.address,
          street_name: selectedSuggestion.text,
          city: selectedSuggestion.context[2].text,
          zipcode: selectedSuggestion.context[1].text,
          privacy: true,
          event_language: language,
          max_attendees: capacity,
          event_type: eventType,
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
        setEventDate("");
        setStartTime("");
        setEndTime("");
        setStreetNumber("");
        setStreetName("");
        setCity("");
        setZip("");
        setPrivacy("");
        setLanguage("");
        setCapacity("");
        setEventType("");
        navigate("/");
      })

      .catch((error) => {
        console.error(error);
        setIsErrorDialogOpen(true);
        setLoading(false);
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
    if (userInput === "eventDate") {
      setEventDate(e.target.value);
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
    if (userInput === "eventType") {
      setEventType(e.target.value);
    }
  };

  const handleCloseErrorDialog = () => {
    setIsErrorDialogOpen(false);
  };

  return (
    <Flex
      h="100vh"
      bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #1E2065 56.45%, #020515 86.14%)"
    >
      <Container h="30vh" w="90%" mt="13vh">
        {loading ? (
          <Skeleton height="150px" my="2" />
        ) : (
          <Flex
            direction="column"
            w="100%"
            h="100%"
            borderRadius="20"
            // border="solid"
            // borderColor="none"
          >
            <SearchMapBox
              token={token}
              setSelectedSuggestion={setSelectedSuggestion}
            />
          </Flex>
        )}
        <SimpleGrid columns={2} spacing={4}>
          <FormControl>
            <FormLabel color="yellow.200" fontSize="10px" mb="1">
              Event Title
            </FormLabel>
            <Input
              placeholder="Name of Event"
              type="text"
              size="xs"
              color="grey.800"
              bg="white"
              onChange={(e) => handleChange("eventTitle", e)}
            />
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Event Date
            </FormLabel>
            <Input
              placeholder="Pick a date"
              type="date"
              mt="-20px"
              size="xs"
              border="none"
              bg="white"
              color="grey.800"
              onChange={(e) => handleChange("eventDate", e)}
            />
            <FormControl>
              <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
                Event Type
              </FormLabel>
              <Select
                placeholder="Choose below"
                size="xs"
                bg="white"
                onChange={(e) => handleChange("eventType", e)}
              >
                <option value="1">Health</option>
                <option value="2">Finance</option>
                <option value="3">Education</option>
              </Select>
            </FormControl>
          </FormControl>

          <FormControl>
            <FormLabel color="yellow.200" fontSize="10px" mb="1">
              Start Time:
            </FormLabel>
            <Input
              type="time"
              mt="-20px"
              size="xs"
              bg="white"
              color="blackAlpha.800"
              onChange={(e) => handleChange("startTime", e)}
            />
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              End Time:
            </FormLabel>
            <Input
              type="time"
              mt="-20px"
              size="xs"
              bg="white"
              color="blackAlpha.800"
              onChange={(e) => handleChange("endTime", e)}
            />

            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Capacity
            </FormLabel>
            <Input
              placeholder="Choose a number"
              type="number"
              min="0"
              step="1"
              size="xs"
              bg="white"
              color="blackAlpha.800"
              onChange={(e) => handleChange("capacity", e)}
            />
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
            General Notes
          </FormLabel>
          <Textarea
            placeholder="Event details..."
            size="xs"
            bg="white"
            color="blackAlpha.800"
            onChange={(e) => handleChange("generalNotes", e)}
          />
        </FormControl>
        <FormControl>
          <Center>
            <Button
              mt="4"
              size="xs"
              type="submit"
              colorScheme="green"
              onClick={handleSubmit}
              cursor="pointer"
            >
              {loading ? <Spinner size="sm" /> : "Create Event"}
            </Button>
          </Center>
          <AlertDialog
            isOpen={isErrorDialogOpen}
            leastDestructiveRef={null}
            onClose={handleCloseErrorDialog}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Please fill out all of the fields.
                </AlertDialogHeader>
                <AlertDialogBody>{errorText}</AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={null} onClick={handleCloseErrorDialog}>
                    OK
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </FormControl>
      </Container>
    </Flex>
  );
};

export default CreateEvent;

// console.log(selectedSuggestion);
// console.log(selectedSuggestion.text);
// console.log(selectedSuggestion.address);
// console.log(selectedSuggestion.context[1].text);
// console.log(selectedSuggestion.context[2].text);

// {/* <Flex my="8" maxWidth="800px">
// {/* First Column */}
// <Box m="4" mr="100px">
//   <form onSubmit={handleSubmit}>
//     <FormControl>
//       <FormLabel color="yellow.200">Event Title</FormLabel>
//       <Input
//         my="2"
//         // variant="filled"
//         placeholder="Name of Event"
//         size="md"
//         color="whiteAlpha.600"
//         onChange={(e) => handleChange("eventTitle", e)}
//       />
//       <FormLabel mt="4" color="yellow.200">
//         General Notes
//       </FormLabel>
//       <Textarea
//         my="2"
//         color="whiteAlpha.600"
//         placeholder="General Notes"
//         size="md"
//         onChange={(e) => handleChange("generalNotes", e)}
//       />
//       <FormLabel color="yellow.200" mt="4">
//         Select Language
//       </FormLabel>
//       <Select
//         color="whiteAlpha.600"
//         placeholder="Languages"
//         onChange={(e) => handleChange("language", e)}
//       >
//         <option value="en">English</option>
//         <option value="es">Spanish</option>
//         <option value="fr">French</option>
//       </Select>
//       <FormLabel color="yellow.200" mt="4">
//         Is your event private?
//       </FormLabel>
//       <Select
//         placeholder="Choose below"
//         color="whiteAlpha.600"
//         onChange={(e) => handleChange("privacy", e)}
//       >
//         <option value="True">Yes</option>
//         <option value="False">No</option>
//       </Select>
//     </FormControl>
//   </form>
// </Box>
// {/* Second Column */}
// <Box ml="4">
//   <FormControl>
//     <FormLabel color="yellow.200" mt="4">
//       Event Date
//     </FormLabel>
//     <Input
//       color="whiteAlpha.600"
//       size="md"
//       type="date"
//       onChange={(e) => handleChange("eventDate", e)}
//     />
//     <FormLabel color="yellow.200" mt="4">
//       Start Time:
//     </FormLabel>
//     <Input
//       color="whiteAlpha.600"
//       size="md"
//       type="time"
//       onChange={(e) => handleChange("startTime", e)}
//     />
//     <FormLabel color="yellow.200" mt="4">
//       End Time:
//     </FormLabel>
//     <Input
//       color="whiteAlpha.600"
//       size="md"
//       type="time"
//       onChange={(e) => handleChange("endTime", e)}
//     />
//     <FormLabel color="yellow.200" mt="4">
//       Capacity
//     </FormLabel>
//     <Input
//       size="md"
//       color="whiteAlpha.600"
//       onChange={(e) => handleChange("capacity", e)}
//     />
//   </FormControl>
//   <Button
//     mt="6"
//     size="md"
//     type="submit"
//     onClick={handleSubmit}
//     cursor="pointer"
//   >
//     Submit
//   </Button>
// </Box>
// </Flex> */}
