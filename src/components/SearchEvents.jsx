import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  Container,
  Box,
  Heading,
  Input,
  Center,
  Text,
  Button,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import MapBoxAll from "./MapBoxAll";

import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const SearchEvents = ({ token, username, userRole, orgDetails }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [allStreets, setAllStreets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const navigate = useNavigate();

  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}event/all`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        const sortedEvents = res.data.sort(
          (a, b) => new Date(b.event_date) - new Date(a.event_date)
        );
        setAllEvents(sortedEvents);

        const streetNamesArray = res.data.map((e) => e.full_address);
        setAllStreets(streetNamesArray);
      });
  }, [token]);

  // Calculate the index of the last event to display on the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  // Calculate the index of the first event to display on the current page
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  // Get the events for the current page
  const currentEvents = allEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEventDetails = (eventID) => {
    console.log(`hi this is the event id: ${eventID}`);
    navigate(`/event/${eventID}`);
  };

  // console.log(searchResult);
  console.log(allEvents);

  return (
    <Center bgColor="gray.800" h="100%">
      <Container as="container-for-events" h="100%" maxW="900px">
        <Center>
          <Heading mt="20" mb="5" color="yellow.200">
            BROWSE EVENTS
          </Heading>
        </Center>

        <MapBoxAll token={token} username={username} allStreets={allStreets} />
        <Box>
          <Flex m="4" direction="column" align="center">
            <Heading mt="5" color="yellow.200">
              {/* {username} Events */}
            </Heading>
            <Flex mt="3">
              <Box mr="2">
                {Array.from({
                  length: Math.ceil(allEvents.length / eventsPerPage),
                }).map((_, index) => (
                  <Button
                    m="2"
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Box>
            </Flex>
            {userRole === "Manager" && (
              <Link to="/create">
                <Button mt="5" backgroundColor="yellow.200">
                  Create an Event
                </Button>
              </Link>
            )}
          </Flex>
        </Box>
        <Center>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="5" mt="10">
            {currentEvents.map((event) => (
              <Box
                key={event.id}
                display="flex"
                alignItems="center"
                borderLeft="1px solid white"
                pl="4"
                m="10"
              >
                <br></br>
                <Avatar
                  size="xl"
                  name={orgDetails.name}
                  mb="10"
                  // src={fileUpload}
                />
                <Box ml="4">
                  {" "}
                  <Heading color="whiteAlpha.800" as="h4" size="md">
                    {event.event_title}
                  </Heading>
                  <Text color="whiteAlpha.800">{event.general_notes}</Text>
                  <Text color="whiteAlpha.800">
                    {dayjs(event.event_date).format("MMMM D, YYYY")}
                    <br />
                    {event.start_time} - {event.end_time}
                    <br />
                    {/* Start Time: {dayjs(event.start_time).format("HH:mm")} */}
                  </Text>
                  <Text color="whiteAlpha.800">{event.privacy}</Text>
                  <Heading
                    onClick={() => handleEventDetails(event.id)}
                    cursor="pointer"
                    size="md"
                    mt="5"
                    color="yellow.200"
                  >
                    LEARN MORE
                  </Heading>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Center>
      </Container>
    </Center>
  );
};

export default SearchEvents;

// console.log(allEvents);
// console.log(allStreets);
// console.log(orgDetails);

// const handleSearch = () => {
//   axios
//     .get(`https://safe-connected.onrender.com/?${searchQuery}=`)
//     .then((response) => {
//       setSearchResult(response.data);
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//       setSearchResult(null);
//     });
// };

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   Flex,
//   Container,
//   Box,
//   Heading,
//   Input,
//   Center,
//   Text,
//   Button,
//   SimpleGrid,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuItemOption,
//   MenuGroup,
//   MenuOptionGroup,
//   MenuDivider,
//   Avatar,
//   InputGroup,
//   InputLeftElement,
// } from "@chakra-ui/react";
// import MapBoxAll from "./MapBoxAll";

// import { PhoneIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";

// import { Link } from "react-router-dom";
// import dayjs from "dayjs";

// const SearchEvents = ({ token, username, userRole, orgDetails }) => {
//   const [allEvents, setAllEvents] = useState([]);
//   const [allStreets, setAllStreets] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResult, setSearchResult] = useState(null);

//   const navigate = useNavigate();
//   const baseURL = "https://safe-connected.onrender.com/";

//   useEffect(() => {
//     axios
//       .get(`${baseURL}event/all`, {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       })
//       .then((res) => {
//         setAllEvents(res.data);
//         const streetNamesArray = res.data.map((e) => e.full_address);
//         setAllStreets(streetNamesArray);
//       });
//   }, [token]);

//   const handleEventDetails = (eventID) => {
//     console.log(`hi this is the event id: ${eventID}`);
//     navigate(`/event/${eventID}`);
//   };

//   console.log(searchResult);

//   return (
//     <Center bgColor="gray.800" h="100%">
//       <Container as="container-for-events" h="100%" maxW="900px">
//         <Center>
//           <Heading mt="20" mb="5" color="yellow.200">
//             BROWSE EVENTS
//           </Heading>
//         </Center>

//         <MapBoxAll token={token} username={username} allStreets={allStreets} />
//         <Box>
//           <Flex m="4" direction="column" align="center">
//             <InputGroup size="lg">
//               <InputLeftElement size="large" pointerEvents="none">
//                 <SearchIcon size="lg" color="gray.300" />
//               </InputLeftElement>
//               <Input
//                 type="text"
//                 width="800px"
//                 placeholder=""
//                 // value={searchQuery}
//                 // onChange={(e) => setSearchQuery(e.target.value)}
//                 color="white"
//                 size="lg"
//               />
//             </InputGroup>
//             <Heading mt="5" color="yellow.200">
//               {/* {username} Events */}
//             </Heading>
//             <Flex mt="3">
//               <Box mr="2">
//                 <Menu>
//                   <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
//                     Date
//                   </MenuButton>
//                   <MenuList>
//                     <MenuItem>Most Recent</MenuItem>
//                     <MenuItem>Most Recently Added</MenuItem>
//                   </MenuList>
//                 </Menu>
//               </Box>
//             </Flex>
//             {userRole === "Manager" && (
//               <Link to="/create">
//                 <Button mt="5" backgroundColor="yellow.200">
//                   Create an Event
//                 </Button>
//               </Link>
//             )}
//           </Flex>
//         </Box>
//         <Center>
//           <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="5" mt="10">
//             {allEvents.map((event) => (
//               <Box
//                 key={event.id}
//                 display="flex"
//                 alignItems="center" // Align items vertically in the center
//                 borderLeft="1px solid white"
//                 pl="4"
//                 m="10"
//               >
//                 <br></br>
//                 <Avatar
//                   size="xl"
//                   name={orgDetails.name}
//                   mb="10"
//                   // src={fileUpload}
//                 />
//                 <Box ml="4">
//                   {" "}
//                   {/* Add margin to create space between Avatar and content */}
//                   <Heading color="whiteAlpha.800" as="h4" size="md">
//                     {event.event_title}
//                   </Heading>
//                   <Text color="whiteAlpha.800">{event.general_notes}</Text>
//                   <Text color="whiteAlpha.800">
//                     {dayjs(event.event_date).format("MMMM D, YYYY")}
//                     <br />
//                     {event.start_time} - {event.end_time}
//                     <br />
//                     {/* Start Time: {dayjs(event.start_time).format("HH:mm")} */}
//                   </Text>
//                   <Text color="whiteAlpha.800">{event.privacy}</Text>
//                   <Heading
//                     onClick={() => handleEventDetails(event.id)}
//                     cursor="pointer"
//                     size="md"
//                     mt="5"
//                     color="yellow.200"
//                   >
//                     LEARN MORE
//                   </Heading>
//                 </Box>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </Center>
//       </Container>
//     </Center>
//   );
// };

// export default SearchEvents;
