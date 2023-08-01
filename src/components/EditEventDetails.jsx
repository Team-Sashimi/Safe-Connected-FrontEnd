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
  SimpleGrid,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [privacy, setPrivacy] = useState(true, false);
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
        setCity(res.data.zipcode);
      });
  }, [token, eventID]);

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
        setPrivacy(privacy);
        setLanguage("");
        setCapacity("");
        setIsAlertOpen(true);
        window.location.reload();
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

  return (
    <Flex
      h="100vh"
      bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
    >
      <Container h="30vh" mt="13vh">
        <Flex
          direction="column"
          w="100%"
          h="100%"
          borderRadius="15"
          // border="solid"
          // borderColor="yellow.200"
        >
          <MapBoxEdit
            token={token}
            username={username}
            setSelectedSuggestion={setSelectedSuggestion}
            eventAddress={eventAddress}
            eventStNumber={eventStNumber}
            eventStreet={eventStreet}
          />
        </Flex>
        <SimpleGrid columns={2} spacing={4}>
          <FormControl>
            <FormLabel color="yellow.200" fontSize="10px" mb="1">
              Event Title
            </FormLabel>
            <Input
              border="none"
              placeholder="Name of Event"
              value={eventTitle}
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
              border="none"
              placeholder="Pick a date"
              value={eventDate}
              type="date"
              mt="-20px"
              size="xs"
              color="grey.800"
              bg="white"
              onChange={(e) => handleChange("eventDate", e)}
            />
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Start Time:
            </FormLabel>
            <Input
              type="time"
              value={startTime}
              mt="-20px"
              size="xs"
              color="grey.800"
              bg="white"
              onChange={(e) => handleChange("startTime", e)}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="yellow.200" fontSize="10px" mb="1">
              End Time:
            </FormLabel>
            <Input
              type="time"
              value={endTime}
              mt="-20px"
              size="xs"
              color="grey.800"
              bg="white"
              onChange={(e) => handleChange("endTime", e)}
            />
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Is your event private?
            </FormLabel>
            <Select
              placeholder="Choose below"
              size="xs"
              value={privacy}
              color="grey.800"
              bg="white"
              onChange={(e) => handleChange("privacy", e)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Capacity
            </FormLabel>
            <Input
              placeholder="Choose below"
              value={capacity}
              size="xs"
              color="grey.800"
              bg="white"
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
            value={generalNotes}
            size="xs"
            color="grey.800"
            bg="white"
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
              Update
            </Button>
          </Center>
        </FormControl>
      </Container>
    </Flex>
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
