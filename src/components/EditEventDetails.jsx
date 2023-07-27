import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Center,
  Text,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import MapBoxEdit from "./MapBoxEdit";

//patch on create event component

const EditEventDetails = ({ token, username, userRole, orgDetails }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [generalNotes, setGeneralNotes] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [language, setLanguage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const [eventDetails, setEventDetails] = useState([]);
  const [eventRoster, setEventRoster] = useState([]);
  const [eventAddress, setEventAddress] = useState("");
  const [eventStNumber, setEventStNumber] = useState("");
  const [eventStreet, setEventStreet] = useState("");
  const { eventID } = useParams();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const navigate = useNavigate();
  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}event/${eventID}/details`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setEventTitle(res.data.event_title);
        setGeneralNotes(res.data.general_notes);
        setEventDate(res.data.event_date);
        setStartTime(res.data.start_time);
        setEndTime(res.data.end_time);
        setCapacity(res.data.max_attendees);
        setEventStNumber(res.data.street_number);
        setEventStreet(res.data.street_name);
        setEventAddress(res.data.full_address);
        setEventDetails(res.data);
      });
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${baseURL}event/${eventID}/details/`,
        {
          event_title: eventTitle,
          general_notes: generalNotes,
          event_language: language,
          event_date: eventDate,
          start_time: endTime,
          end_time: startTime,
          street_number: selectedSuggestion.address,
          street_name: selectedSuggestion.text,
          city: selectedSuggestion.context[2].text,
          zipcode: selectedSuggestion.context[1].text,
          privacy: privacy,
          max_attendees: capacity,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
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
        setIsAlertOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    navigate("/");
    // You can also perform any other necessary actions after the AlertDialog is closed.
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
  };

  console.log(selectedSuggestion);
  console.log(eventID);

  return (
    <>
      <Center bgColor="gray.800" h="92vh">
        <Container as="container-for-events" h="100%" maxW="900px">
          <MapBoxEdit
            token={token}
            username={username}
            setSelectedSuggestion={setSelectedSuggestion}
            eventAddress={eventAddress}
            eventStNumber={eventStNumber}
            eventStreet={eventStreet}
          />
        </Container>
        <Flex my="8" maxWidth="800px">
          {/* First Column */}
          <Box m="4" mr="100px">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel color="yellow.200">Event Title</FormLabel>
                <Input
                  my="2"
                  value={eventTitle}
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
                  value={generalNotes}
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
                  value={language}
                  onChange={(e) => handleChange("language", e)}
                >
                  <option value="1">English</option>
                  <option value="2">Spanish</option>
                  <option value="3">French</option>
                </Select>
                <FormLabel color="yellow.200" mt="4">
                  Is your event private?
                </FormLabel>
                <Select
                  placeholder="Choose below"
                  color="whiteAlpha.600"
                  value={privacy}
                  onChange={(e) => handleChange("privacy", e)}
                >
                  <option value="True">Yes</option>
                  <option value="False">No</option>
                </Select>
              </FormControl>
            </form>
          </Box>
          {/* Second Column */}
          <Box ml="4">
            <FormControl>
              <FormLabel color="yellow.200" mt="4">
                Event Date
              </FormLabel>
              <Input
                color="whiteAlpha.600"
                value={eventDate}
                size="md"
                type="date"
                onChange={(e) => handleChange("eventDate", e)}
              />
              <FormLabel color="yellow.200" mt="4">
                Start Time:
              </FormLabel>
              <Input
                color="whiteAlpha.600"
                value={endTime}
                size="md"
                type="time"
                onChange={(e) => handleChange("startTime", e)}
              />
              <FormLabel color="yellow.200" mt="4">
                End Time:
              </FormLabel>
              <Input
                color="whiteAlpha.600"
                value={startTime}
                size="md"
                type="time"
                onChange={(e) => handleChange("endTime", e)}
              />
              <FormLabel color="yellow.200" mt="4">
                Capacity
              </FormLabel>
              <Input
                size="md"
                value={capacity}
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
            <AlertDialog
              isOpen={isAlertOpen}
              leastDestructiveRef={null}
              onClose={handleCloseAlert}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Success
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    The patch request has been successful.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={null} onClick={handleCloseAlert}>
                      Close
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default EditEventDetails;

// return (
//   <>
//     <Container as="container-for-events" h="100%" maxW="900px">
//       <MapBoxEdit
//         token={token}
//         username={username}
//         eventAddress={eventAddress}
//         eventStNumber={eventStNumber}
//         eventStreet={eventStreet}
//       />
//     </Container>
//     <Heading>Hi</Heading>
//     <Text>{eventID}</Text>
//   </>
// );
// };

// export default EditEventDetails;
