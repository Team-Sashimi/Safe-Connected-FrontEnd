import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  SimpleGrid,
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
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";

const Main = ({ username, token, userRole }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [managerEvents, setManagerEvents] = useState([]);
  const [eventID, setEventID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}event/organizer/list/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setManagerEvents(res.data);
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

  return (
    <Flex
      w="300px"
      flexDirection="column"
      h="100%"
      pt={{ base: "100px", md: "75px" }}
    >
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="10px">
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
          <Text fontSize="md" color="white" fontWeight="bold" mb="3" pb="2px">
            Welcome! {username}
          </Text>
          <Text fontSize="xs" color="#fff">
            Create Events | Manage Clients | Built in Translation
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          bg="blue.500"
          boxShadow="md"
          borderRadius="lg"
        >
          {/* <Text fontSize="sm" color="#fff" fontWeight="bold">
            Manage Clients
          </Text>
          <Text fontSize="sm" color="#fff" fontWeight="bold">
            Content Translation.
          </Text> */}
        </Flex>
        <Spacer></Spacer>
        <Spacer></Spacer>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th color="yellow.200">My Events</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td color="gray.400" fontSize="12px">
                  Event Title
                </Td>
              </Tr>
              <Tr>
                <Td color="gray.400" fontSize="12px">
                  Event Title 2
                </Td>
              </Tr>
              <Tr>
                <Td color="gray.400" fontSize="12px">
                  Event Title 3
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Spacer></Spacer>
        <Spacer></Spacer>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th color="yellow.200">My Clients</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td color="gray.400" fontSize="12px">
                  Client
                </Td>
              </Tr>
              <Tr>
                <Td color="gray.400" fontSize="12px">
                  Client 2
                </Td>
              </Tr>
              <Tr>
                <Td color="gray.400" fontSize="12px">
                  Client 2
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </SimpleGrid>
    </Flex>
  );
};

export default Main;

// pretty good.

// return (
//   <>
//     <SimpleGrid
//       // backgroundColor="yellow.200"
//       mt="8"
//       h="75%"
//       w="80%"
//       rows={2}
//       // spacing={4}
//       borderRadius="20px"
//       alignItems="center"
//       // maxChildHeight="100px"
//     >
//       <Box
//         // backgroundColor="gray.200"
//         borderRadius="20px"
//         maxHeight="30vh"
//         overflow="auto"
//         p="4"
//       >
//         <Heading color="yellow.200" textAlign="center">
//           Let's get started.
//         </Heading>
//         <br></br>

//         <Text color="yellow.200" textAlign="center">
//           Create & manage events.
//         </Text>
//         <Text color="yellow.200" textAlign="center">
//           Safely register clients.
//         </Text>
//         <Text color="yellow.200" textAlign="center">
//           Built in language translation.
//         </Text>
//       </Box>
//     </SimpleGrid>
//   </>
// );
// };

//   return (
//     <Flex
//       mt="20"
//       height="80vh"
//       w="20vh"
//       direction="column" // Set direction to "column" to stack the content vertically
//       alignItems="center"
//       justifyContent="center"
//       // bg="yellow.800"
//     >
//       {/* <Box mt={8}>
//         <Text color="yellow">Welcome!</Text>
//       </Box> */}
//       <Flex>
//         {/* Icon 1 */}
//         <Flex
//           direction="column"
//           alignItems="center"
//           p={8}
//           rounded="md"
//           width="100px" // Set a fixed width for the boxes
//         >
//           <Box>
//             <Icon color="yellow.200" as={FiUsers} boxSize={10} />
//           </Box>
//           <Text color="yellow.200" fontSize="lg" fontWeight="bold" mb={4}>
//             Register
//           </Text>
//         </Flex>

//         {/* Icon 2 */}
//         <Flex
//           direction="column"
//           alignItems="center"
//           p={8}
//           rounded="md"
//           width="100px" // Set a fixed width for the boxes
//         >
//           <Box mb="2">
//             <Icon color="yellow.200" as={AddIcon} boxSize={10} />
//           </Box>
//           <Text color="yellow.200" fontSize="lg" fontWeight="bold" mb={4}>
//             Create
//           </Text>
//         </Flex>

//         {/* Icon 3 */}
//         <Flex
//           direction="column"
//           alignItems="center"
//           p={8}
//           rounded="md"
//           width="100px" // Set a fixed width for the boxes
//         >
//           <Box>
//             <Icon color="yellow.200" as={FiEdit2} boxSize={10} />
//           </Box>
//           <Text color="yellow.200" fontSize="lg" fontWeight="bold" mb={4}>
//             Manage
//           </Text>
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// };

// most recent!
// return (
//   <>
//     <Flex
//       direction="column"
//       marginLeft={["5%", "10%", "15%"]} // Adjust the left margin for different screen sizes
//       marginTop="12vh"
//     >
//       <Container h="100%" w="100%">
//         <Flex
//           direction="column" // Display the elements beneath each other
//           w={["100%", "80%", "500px"]} // Adjust the width for different screen sizes
//           h={["150px", "200px", "250px"]}
//           borderRadius="15"
//           border="solid"
//           // borderColor="yellow.200"
//           align="flex-end" // Right-align the items horizontally
//           justify="center" // Right-align the items vertically
//           overflow="hidden" // Prevent content from overflowing
//         >
//           <Heading
//             css={{
//               letterSpacing: "0.1em", // Adjust the letter spacing value as per your preference
//             }}
//             mb="2"
//             fontSize="xl"
//             color="yellow.200"
//           >
//             GETTING STARTED
//           </Heading>
//           <Text fontSize="small" color="whiteAlpha.500">
//             Safely register clients.
//           </Text>
//           <Text fontSize="small" color="whiteAlpha.500">
//             Create & manage events.
//           </Text>
//           <Text fontSize="small" color="whiteAlpha.500">
//             Language translation built in.
//           </Text>
//         </Flex>
//         <Flex
//           direction="column" // Display the elements beneath each other
//           w={["100%", "80%", "500px"]} // Adjust the width for different screen sizes
//           h={["200px", "250px", "300px"]} // Adjust the height to make the accordion smaller
//           borderRadius="15"
//           border="solid"
//           // borderColor="yellow.200"
//           align="flex-end" // Right-align the items horizontally
//           justify="center" // Right-align the items vertically
//           overflow="hidden" // Prevent content from overflowing
//         >
//           <Heading
//             css={{
//               letterSpacing: "0.1em", // Adjust the letter spacing value as per your preference
//             }}
//             mb="3"
//             fontSize="lg"
//             color="yellow.200"
//           >
//             CREATED EVENTS
//           </Heading>
//           {managerEvents.slice(0, 5).map((event) => (
//             <Text
//               fontSize="small"
//               color="whiteAlpha.500"
//               key={event.id}
//               ml="auto"
//               onClick={() => handleEventDetails(event.id)}
//             >
//               {event.event_title}
//             </Text>
//           ))}
//         </Flex>
//         <Flex
//           direction="column"
//           align="flex-end" // Right-align the items horizontally
//           justify="flex-end" // Right-align the items vertically
//           overflow="hidden"
//         >
//           <Heading
//             css={{
//               letterSpacing: "0.1em", // Adjust the letter spacing value as per your preference
//             }}
//             mb="3"
//             fontSize="lg"
//             color="yellow.200"
//           >
//             REGISTERED CLIENTS
//           </Heading>
//           {managerEvents.slice(0, 5).map((event) => (
//             <Text
//               fontSize="small"
//               color="whiteAlpha.500"
//               key={event.id}
//               ml="auto"
//             >
//               {event.event_title}
//             </Text>
//           ))}
//         </Flex>
//       </Container>
//     </Flex>
//   </>
// );
// };

//  {/* MiniStatistics Card */}
//  <Flex
//  flexDirection="column"
//  alignItems="center"
//  justifyContent="center"
//  // bg="blue.500"
//  boxShadow="lg"
//  borderRadius="lg"
//  p="20px"
// >
//  <Text
//    h="150px"
//    fontSize="md"
//    color="gray.400"
//    fontWeight="bold"
//    mb="auto"
//  >
//    Your Events
//  </Text>
//  <Spacer />
//  <Flex align="center">
//    <Text
//      fontSize="sm"
//      color="#fff"
//      fontWeight="bold"
//      cursor="pointer"
//      transition="all .3s ease"
//      my={{ base: "1.5rem", lg: "0px" }}
//      _hover={{ me: "4px" }}
//      mr="3"
//    >
//      Manage
//    </Text>
//    <FiCalendar
//      w="20px"
//      h="20px"
//      color="#fff"
//      fontSize="2xl"
//      transition="all .3s ease"
//      mx=".3rem"
//      cursor="pointer"
//      pt="4px"
//      _hover={{ transform: "translateX(20%)" }}
//    />
//  </Flex>
// </Flex>
