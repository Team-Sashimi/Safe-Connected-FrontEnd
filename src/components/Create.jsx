import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
  const [privacy, setPrivacy] = useState("");
  const [language, setLanguage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const { eventID } = useParams();
  const [currentPage, setCurrentPage] = useState(0);

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
          event_date: eventDate,
          start_time: endTime,
          end_time: startTime,
          street_number: selectedSuggestion.address,
          street_name: selectedSuggestion.text,
          city: selectedSuggestion.context[2].text,
          zipcode: selectedSuggestion.context[1].text,
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

  // console.log(selectedSuggestion);
  // console.log(selectedSuggestion.text);
  // console.log(selectedSuggestion.address);
  // console.log(selectedSuggestion.context[1].text);
  // console.log(selectedSuggestion.context[2].text);

  return (
    <Flex
      direction="column"
      marginLeft={["5%", "10%", "15%"]}
      marginTop="2.5vh"
    >
      <Container h="100vh">
        <Flex
          direction="column"
          w={["100%", "80%", "500px"]}
          h={["300px", "200px", "250px"]}
          borderRadius="15"
          border="solid"
          align="flex-end"
          justify="center"
          overflow="auto"
        >
          <Heading color="yellow.200">Create event.</Heading>
          <SearchMapBox
            token={token}
            setSelectedSuggestion={setSelectedSuggestion}
          />
        </Flex>
        <Flex
          direction="column"
          w={["100%", "80%", "500px"]}
          h={["300px", "200px", "250px"]}
          borderRadius="15"
          border="solid"
          align="center"
          justify="center"
          overflow="hidden"
        >
          <form w="300px" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel color="yellow.200" fontSize="10px" mb="1">
                Event Title
              </FormLabel>
              <Input
                placeholder="Name of Event"
                size="xs"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("eventTitle", e)}
              />
              <FormLabel color="yellow.200" fontSize="10px" mb="1">
                Event Title
              </FormLabel>
              <Input
                placeholder="Name of Event"
                mt="-20px"
                size="xs"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("eventTitle", e)}
              />
              <FormLabel color="yellow.200" fontSize="10px" mb="1">
                Event Title
              </FormLabel>
              <Input
                placeholder="Name of Event"
                mt="-20px"
                size="xs"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("eventTitle", e)}
              />
              <FormLabel color="yellow.200" fontSize="10px" mb="1">
                Event Title
              </FormLabel>
              <Input
                placeholder="Name of Event"
                mt="-20px"
                size="xs"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("eventTitle", e)}
              />
              <FormLabel color="yellow.200" fontSize="10px" mb="1">
                Event Title
              </FormLabel>
              <Input
                placeholder="Name of Event"
                mt="-20px"
                size="xs"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("eventTitle", e)}
              />
              <FormLabel color="yellow.200" fontSize="10px" mb="1">
                Event Title
              </FormLabel>
              <Input
                placeholder="Name of Event"
                mt="-20px"
                size="xs"
                color="whiteAlpha.600"
                onChange={(e) => handleChange("eventTitle", e)}
              />
            </FormControl>

            <Button backgroundColor="yellow.200" type="submit">
              Submit
            </Button>
          </form>
        </Flex>
      </Container>
    </Flex>
  );
};

export default CreateEvent;

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
