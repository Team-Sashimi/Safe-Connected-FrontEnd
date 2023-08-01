import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Container,
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Avatar,
  Icon,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import { ArrowBackIcon, ArrowForwardIcon, WarningIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const SearchEvents = ({ token, username, userRole, orgDetails, language }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [allStreets, setAllStreets] = useState([]);
  const [eventTypeFilter, setEventTypeFilter] = useState(null);
  const [publishedFilter, setPublishedFilter] = useState(null);

  const navigate = useNavigate();

  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}${language}/org/1/events`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setAllEvents(res.data);
        const streetNamesArray = res.data.map((e) => e.full_address);
        setAllStreets(streetNamesArray);
      });
  }, [token]);

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
  };

  const handleShowAllEvents = () => {
    setShowAllEvents(true);
  };

  console.log(allEvents);

  return (
    <SimpleGrid
      h="100vh"
      alignContent="center"
      bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #1E2065 56.45%, #020515 86.14%)"
      columns={1}
      rows={5} // Changed rows to 5 to accommodate headline and 3 Select inputs
      spacing={1}
    >
      <Box height="10px" />

      <Box textAlign="center">
        {userRole === "Client" && (
          <Heading color="white" as="h1" size="md">
            Your Organizations Events
          </Heading>
        )}
        {userRole === "Manager" && (
          <Heading color="white" as="h1" size="md">
            Browse, Sort & Manage Events
          </Heading>
        )}
      </Box>

      <Flex mt="4" justifyContent="center" alignItems="center">
        <Select
          size="sm"
          borderRadius="lg"
          placeholder="Event Type"
          color="yellow.200"
          fontSize="10px"
          w="100px"
          mx={2}
          onChange={(e) => setEventTypeFilter(e.target.value)}
        >
          <option value="1">Health</option>
          <option value="2">Finance</option>
          <option value="3">Education</option>
        </Select>
        {userRole === "Manager" && (
          <Select
            size="sm"
            borderRadius="lg"
            placeholder="Published"
            color="yellow.200"
            fontSize="10px"
            w="100px"
            mx={2}
            onChange={(e) => setPublishedFilter(e.target.value)}
          >
            <option value="True">Published for all</option>
            <option value="False">Save for later</option>
          </Select>
        )}
        {/* {userRole === "Client" && (
          <Select
            size="sm"
            borderRadius="lg"
            placeholder="Signed Up"
            color="yellow.200"
            fontSize="10px"
            w="100px"
            mx={2}
            onChange={(e) => setPublishedFilter(e.target.value)}
          >
            <option value="True">Attending</option>
            <option value="False">Not Attending</option>
          </Select>
        )} */}
        {/* <Button
          mx={2}
          variant="none"
          borderRadius="lg"
          color="yellow.200"
          fontSize="10px"
          size="sm"
          colorScheme="blue"
          onClick={handleShowAllEvents}
        >
          Show All
        </Button> */}
      </Flex>
      <Box mt="3" overflow="auto" maxHeight="410px">
        <Flex direction="column" justifyContent="center" alignItems="center">
          {allEvents
            .filter((event) => {
              if (eventTypeFilter) {
                return event.event_type === parseInt(eventTypeFilter);
              }
              return true;
            })
            .filter((event) => {
              if (publishedFilter !== null) {
                return event.privacy === (publishedFilter === "True");
              }
              return true;
            })
            .map((event) => (
              <Box
                key={event.id}
                cursor="pointer"
                p={4}
                mb="2"
                bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
                color="whiteAlpha.800"
                height="80px"
                w="300px"
                boxShadow="md"
                rounded="md"
                overflow="auto"
                onClick={() => handleEventDetails(event.id)}
              >
                <Heading fontSize="14px" mb="1">
                  {event.event_title}
                </Heading>
                <Text fontWeight="bold" fontSize="10px">
                  {dayjs(event.event_date).format("MM/DD/YYYY")}
                </Text>

                <Text fontSize="10px">{event.general_notes}</Text>
              </Box>
            ))}
          <Box></Box>
          {/* <Box mb="2" bg="tomato" height="80px" w="300px"></Box>
          <Box mb="2" bg="tomato" height="80px" w="300px"></Box>
          <Box mb="2" bg="tomato" height="80px" w="300px"></Box>
          <Box mb="2" bg="tomato" height="80px" w="300px"></Box>
          <Box mb="2" bg="tomato" height="80px" w="300px"></Box> */}
        </Flex>
      </Box>
    </SimpleGrid>
  );
};

export default SearchEvents;

// /?event_title=<searchtext>

// demo code
// return (
//   <Flex mt="12">
//     <Box
//       width="90%"
//       height="80vh"
//       m="5%"
//       p={4}
//       textAlign="right"
//       marginLeft="20px"
//       color="white" // White text color
//       borderRadius="md" // Rounded corners
//       overflow="auto" // Enable scroll if contents overflow
//     >
//       <Heading color="yellow.200" size="md" mb="4" mr="4">
//         Browse Events
//       </Heading>
//       <InputGroup size="xs" mt="2">
//         <InputLeftElement pointerEvents="none">
//           <SearchIcon color="gray.300" />
//         </InputLeftElement>
//         <Input
//           border="none"
//           justifyContent="flex-end"
//           type="text"
//           width="100%"
//           size="xs"
//           fontSize="xs"
//           placeholder="Search by keywords"
//           // value={searchQuery}
//           // onChange={(e) => handleEventSearch(e.target.value)}
//           color="white"
//           px="2"
//           py="1"
//         />
//       </InputGroup>
//       <SimpleGrid columns={2} spacing={4}>
//         {eventsForPage.map((event) => (
//           <Box
//             key={event.id}
//             p={4}
//             bg="transparent" // Transparent background for individual event boxes
//             boxShadow="md"
//             rounded="md"
//           >
//             <Heading fontSize="12px">{event.event_title}</Heading>
//             <Text fontWeight="bold" fontSize="10px">
//               {dayjs(event.event_date).format("MMMM D, YYYY")}
//             </Text>
//             {userRole === "Manager" ? (
//               <Text
//                 onClick={() => handleEventDetails(event.id)}
//                 cursor="pointer"
//                 size="sm"
//                 mt="5"
//                 color="yellow.200"
//                 fontSize="10px"
//               >
//                 SEE MORE
//               </Text>
//             ) : (
//               <Text
//                 onClick={() => handleEventDetails(event.id)}
//                 cursor="pointer"
//                 size="sm"
//                 mt="5"
//                 color="yellow.200"
//                 fontSize="8px"
//               >
//                 LEARN MORE
//               </Text>
//             )}
//           </Box>
//         ))}
//       </SimpleGrid>

//       <Box mt="-5vh">
//         {currentPage > 1 && (
//           <Button
//             size="xs"
//             onClick={() => handlePageChange(currentPage - 1)}
//             mr={2}
//           >
//             <Icon as={ArrowBackIcon} />
//           </Button>
//         )}
//         {currentPage < totalPages && (
//           <Button size="xs" onClick={() => handlePageChange(currentPage + 1)}>
//             <Icon as={ArrowForwardIcon} />
//           </Button>
//         )}
//       </Box>
//     </Box>
//   </Flex>
// );
// };

// {
//   eventsForPage.map((event) => (
//     <Box
//       key={event.id}
//       p={4}
//       bg="transparent" // Transparent background for individual event boxes
//       boxShadow="md"
//       rounded="md"
//     >
//       <Heading fontSize="12px">{event.event_title}</Heading>
//       <Text fontWeight="bold" fontSize="10px">
//         {dayjs(event.event_date).format("MMMM D, YYYY")}
//       </Text>

//       <Text
//         onClick={() => handleEventDetails(event.id)}
//         cursor="pointer"
//         size="sm"
//         mt="5"
//         color="yellow.200"
//         fontSize="10px"
//       >
//         SEE MORE
//       </Text>
//     </Box>
//   ));
// }

// const itemsPerPage = 7; // Number of items to show per page, adjusted to 5
// const totalPages = Math.ceil(allEvents.length / itemsPerPage);

// // Calculate the start and end index of the items to display on the current page
// const startIndex = (currentPage - 1) * itemsPerPage;
// const endIndex = startIndex + itemsPerPage;

// // Get the events for the current page
// const eventsForPage = allEvents.slice(startIndex, endIndex);

// // Function to handle pagination
// const handlePageChange = (page) => {
//   setCurrentPage(page);
// };

// const [allStreets, setAllStreets] = useState([]);
// const [currentPage, setCurrentPage] = useState(1);
// const eventsPerPage = 5; // Reduce the number of events per page for smaller screens
