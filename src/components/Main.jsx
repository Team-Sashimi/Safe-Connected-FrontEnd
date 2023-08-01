import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  SimpleGrid,
  Box,
  Container,
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
  Avatar,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import dayjs from "dayjs";

const Main = ({ username, token, userRole, language }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [managerEvents, setManagerEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [eventID, setEventID] = useState("");
  const [memberID, setMemberID] = useState("");
  const [clientEvents, setClientEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseURL}event/client/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setClientEvents(res.data);
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

  const handleMemberProfile = (memberID) => {
    console.log(`hi this is a member with an id of: ${memberID}`);
    navigate(`/member/${memberID}`);
    setEventID(eventID);
  };

  const formatToRegularTime = (militaryTime) => {
    const [hours, minutes] = militaryTime.split(":");
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log(members);

  return (
    <>
      <Flex
        flexDirection="column"
        h="100vh"
        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
        pt="75px"
        alignItems="flex-start"
      >
        <Box ml="2" overflow="auto" maxHeight="500px">
          <SimpleGrid columns={1} spacing={1}>
            {userRole === "Manager" && (
              <Card bgColor="none" h="200px" w="200px" overflow="hidden">
                <CardHeader>
                  <Heading color="white" size="sm" fontSize="16px" mt="1">
                    {" "}
                    Add Events
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text color="whiteAlpha.600" fontSize="12px" mt="-4">
                    Create events for your organization.
                  </Text>
                  <Link to="/create">
                    <Button mt="10" size="sm">
                      Create
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            )}

            {userRole === "Manager" && (
              <Card bgColor="none" h="200px" w="200px" overflow="hidden">
                <CardHeader>
                  <Heading color="white" size="sm" fontSize="16px" mt="1">
                    {" "}
                    Register Clients
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text color="whiteAlpha.600" fontSize="12px" mt="-4">
                    Safely register your clients to view and sign up for your
                    events.
                  </Text>
                  <Link to="/register-client">
                    <Button mt="7" size="sm">
                      Register
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            )}

            {userRole === "Manager" && (
              <Card bgColor="none" h="200px" w="200px" overflow="hidden">
                <CardHeader>
                  <Heading color="white" size="sm" fontSize="16px" mt="1">
                    View your events and clients.
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text color="whiteAlpha.600" fontSize="12px" mt="-4">
                    Edit your events or update client information here.
                  </Text>
                  <Link to="/view-events-clients">
                    <Button mt="7" size="sm">
                      View here
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            )}

            {userRole === "Client" && (
              <Card
                mt="15px"
                bgColor="none"
                h="200px"
                w="200px"
                overflow="hidden"
              >
                <CardHeader>
                  <Heading color="white" size="sm" fontSize="16px" mt="1">
                    View events you've signed up for!
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text color="whiteAlpha.600" fontSize="12px" mt="-4">
                    Check details, cancel your sign up, or contact the
                    organization!
                  </Text>
                  <Link to="/view-events-clients">
                    <Button mt="7" size="sm">
                      Your Events
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            )}

            {userRole === "Client" && (
              <Card
                mt="15"
                bgColor="none"
                h="200px"
                w="200px"
                overflow="hidden"
              >
                <CardHeader>
                  <Heading color="white" size="sm" fontSize="16px" mt="1">
                    Check out events offered by your organization.
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text color="whiteAlpha.600" fontSize="12px" mt="-4">
                    A full list of events, from education to finance.
                  </Text>
                  <Link to="/all-events">
                    <Button mt="5" size="sm">
                      Browse Now
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            )}
          </SimpleGrid>
        </Box>
        <Box
          // bg="yellow"
          h="500px"
          w="150px"
          ml="20px"
          position="absolute"
          right="0"
          mt="15"
        >
          <Flex
            direction="column"
            justifyContent="space-evenly"
            h="90%"
            alignItems="center"
          >
            <Heading fontSize="12px" color="yellow.200">
              Connected{" "}
            </Heading>
            <Heading color="yellow.200" mt="-5" fontSize="12px">
              {" "}
              Organizations
            </Heading>
            <Box
              // border="2px solid white"
              borderRadius="50px"
              h="100px"
              w="100px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                size="xl"
                src="https://safeconnectedstatic.s3.amazonaws.com/media/avatarcws_CYOdYKF.jpeg"
                alt="Avatar"
                borderRadius="50px"
              />
            </Box>
            <Box
              // border="2px solid white"
              borderRadius="4px"
              h="100px"
              w="100px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar
                size="xl"
                src="https://safeconnectedstatic.s3.amazonaws.com/media/Screenshot_2023-07-31_at_4.00.20_PM.png"
                alt="Avatar"
                borderRadius="4px"
              />
            </Box>
            {/* <Box
              border="2px solid white"
              borderRadius="4px"
              h="100px"
              w="100px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Text color="white">Content 3</Text>
            </Box> */}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Main;

//   return (
//     <Flex
//       flexDirection="column"
//       bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
//       h="100vh"
//       pt="60px"
//     >
//       <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} m="5" spacing="10px">
//         {/* MiniStatistics Card */}
//         <Flex
//           flexDirection="column"
//           alignItems="center"
//           justifyContent="center"
//           // bg="blue.500"
//           boxShadow="md"
//           borderRadius="lg"
//           p="1px"
//         >
//           <Text
//             fontSize="md"
//             color="yellow.200"
//             fontWeight="bold"
//             mb="3"
//             pb="2px"
//           >
//             Welcome! {username}
//           </Text>
//         </Flex>
//         <Flex
//           flexDirection="column"
//           alignItems="flex-start"
//           justifyContent="center"
//           // bg="blue.500"
//           boxShadow="md"
//           borderRadius="lg"
//           ml="20px"
//         >
//           <Spacer></Spacer>
//           <Spacer></Spacer>
//           {userRole === "Manager" && (
//             <TableContainer w="30vh">
//               <Table size="sm">
//                 <Thead>
//                   <Tr>
//                     <Th color="yellow.200" fontSize="14px">
//                       My Events
//                     </Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {managerEvents.map((event) => (
//                     <Tr
//                       key={event.id}
//                       onClick={() => handleEventDetails(event.id)}
//                     >
//                       <Td color="gray.400" fontSize="12px" fontWeight="bold">
//                         {event.event_title}
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </TableContainer>
//           )}

//           {userRole === "Client" && (
//             <TableContainer>
//               <Table size="sm">
//                 <Thead>
//                   <Tr>
//                     <Th color="yellow.200" fontSize="14px">
//                       Events I'm Signed Up For:
//                     </Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {clientEvents.map((event) => (
//                     <Tr
//                       key={event.id}
//                       onClick={() => handleEventDetails(event.id)}
//                     >
//                       <Td color="gray.400" fontSize="12px" fontWeight="bold">
//                         {event.event_title}
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </TableContainer>
//           )}
//           <Spacer></Spacer>
//           <Spacer></Spacer>

//           {userRole === "Manager" && (
//             <TableContainer w="35vh" mt="10">
//               <Table size="sm">
//                 <Thead>
//                   <Tr>
//                     <Th color="yellow.200" fontSize="14">
//                       Organization Members
//                     </Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   {members.map((member) => (
//                     <Tr
//                       key={member.id}
//                       onClick={() => handleMemberProfile(member.member)}
//                     >
//                       <Td
//                         _hover={{ color: "yellow" }} // Apply the hover effect using _hover prop
//                         color="gray.400"
//                         fontSize="12px"
//                         fontWeight="bold"
//                       >
//                         <Flex align="center">
//                           {" "}
//                           {/* Wrap Avatar and name inside Flex */}
//                           <Avatar
//                             size="sm"
//                             src={member.user_avatar}
//                             name={member.member_full_name}
//                             mr="2"
//                           />
//                           <span>{member.member_full_name}</span>
//                           {/* <span>{member.member}</span> */}
//                         </Flex>
//                       </Td>
//                     </Tr>
//                   ))}
//                 </Tbody>
//               </Table>
//             </TableContainer>
//           )}
//         </Flex>
//       </SimpleGrid>
//     </Flex>
//   );
// };

// export default Main;

// client view
// events they have signed up for.
// list of events there organization is offering.

// manager view
// bring browse events to home page
// filter by my events (i created), organization events,
// published events, draft (unpublished) events.

//

// DEMO MAIN
// return (
//   <Flex
//     w="300px"
//     flexDirection="column"
//     h="100%"
//     pt={{ base: "100px", md: "75px" }}
//   >
//     <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="10px">
//       {/* MiniStatistics Card */}
//       <Flex
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         // bg="blue.500"
//         boxShadow="md"
//         borderRadius="lg"
//         p="1px"
//       >
//         <Text
//           fontSize="md"
//           color="yellow.200"
//           fontWeight="bold"
//           mb="3"
//           pb="2px"
//         >
//           Welcome! {username}
//         </Text>
//         <Text fontSize="xs" color="#fff">
//           Create Events | Manage Clients | Built in Translation
//         </Text>
//       </Flex>
//       <Flex
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         bg="blue.500"
//         boxShadow="md"
//         borderRadius="lg"
//       ></Flex>
//       <Spacer></Spacer>
//       <Spacer></Spacer>
//       {userRole === "Manager" && (
//         <TableContainer>
//           <Table size="sm">
//             <Thead>
//               <Tr>
//                 <Th color="yellow.200" fontSize="14px">
//                   My Events
//                 </Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {managerEvents.map((event) => (
//                 <Tr
//                   key={event.id}
//                   onClick={() => handleEventDetails(event.id)}
//                 >
//                   <Td color="gray.400" fontSize="12px" fontWeight="bold">
//                     {event.event_title}
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       )}

//       {userRole === "Client" && (
//         <TableContainer>
//           <Table size="sm">
//             <Thead>
//               <Tr>
//                 <Th color="yellow.200" fontSize="14px">
//                   Events I'm Signed Up For:
//                 </Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {clientEvents.map((event) => (
//                 <Tr
//                   key={event.id}
//                   onClick={() => handleEventDetails(event.id)}
//                 >
//                   <Td color="gray.400" fontSize="12px" fontWeight="bold">
//                     {event.event_title}
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       )}
//       <Spacer></Spacer>
//       <Spacer></Spacer>
//       {userRole === "Manager" && (
//         <TableContainer>
//           <Table size="sm">
//             <Thead>
//               <Tr>
//                 <Th color="yellow.200" fontSize="10">
//                   Organization Members
//                 </Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {members.map((member) => (
//                 <Tr
//                   key={member.id}
//                   onClick={() => handleMemberProfile(member.member)}
//                 >
//                   <Td
//                     _hover={{ color: "yellow" }} // Apply the hover effect using _hover prop
//                     color="gray.400"
//                     fontSize="12px"
//                     fontWeight="bold"
//                   >
//                     <Flex align="center">
//                       {" "}
//                       {/* Wrap Avatar and name inside Flex */}
//                       <Avatar
//                         size="sm"
//                         src={member.user_avatar}
//                         name={member.member_full_name}
//                         mr="2"
//                       />
//                       <span>{member.member_full_name}</span>
//                       {/* <span>{member.member}</span> */}
//                     </Flex>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </TableContainer>
//       )}
//     </SimpleGrid>
//     <Link to="/register-client">
//       <Button>Add New</Button>
//     </Link>
//   </Flex>
// );
// };

// export default Main;
//
//
//
// useEffect(() => {
//   axios
//     .get(`${baseURL}${language}/event/organizer/list/`, {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     })
//     .then((res) => {
//       setManagerEvents(res.data);
//     })
//     .catch((error) => {
//       console.log("Error fetching manager events:", error);
//     });
// }, [token]);

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

//////////////////////
// return (
//   <>
//     <SimpleGrid
//       h="100vh"
//       alignContent="center"
//       bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
//       columns={2}
//       rows={2}
//       spacing={3}
//     >
//       <Box ml="4" height="120px">
//         <Link to="/your-events">
//           <Flex alignItems="center" justifyContent="center" h="100%">
//             <Button size="sm">MY EVENTS</Button>
//           </Flex>
//         </Link>
//       </Box>
//       <Box mr="4" height="120px">
//         <Flex alignItems="center" justifyContent="center" h="100%">
//           <Link to="/members">
//             <Button size="sm">MY MEMBERS</Button>
//           </Link>
//         </Flex>
//       </Box>
//       <Box ml="4" height="120px">
//         <Link to="/register-client">
//           <Flex alignItems="center" justifyContent="center" h="100%">
//             <Button size="sm">REGISTER CLIENT</Button>
//           </Flex>
//         </Link>
//       </Box>
//       <Box mr="4" height="120px">
//         <Link to="/create">
//           <Flex alignItems="center" justifyContent="center" h="100%">
//             <Button size="sm">CREATE EVENT</Button>
//           </Flex>
//         </Link>
//       </Box>
//     </SimpleGrid>
//   </>
// );
// };

// export default Main;

/////tabs
// return (
//   <>
//     {" "}
//     <Flex
//       flexDirection="column"
//       h="100vh"
//       bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
//       pt="90px"
//     >
//       <Tabs isFitted variant="enclosed" size="sm">
//         <TabList>
//           <Tab fontSize="xs" color="whiteAlpha.600">
//             Events
//           </Tab>
//           <Tab fontSize="xs" color="whiteAlpha.600">
//             Members
//           </Tab>
//         </TabList>
//         <TabPanels>
//           <TabPanel>
//             <Center>
//               <TableContainer w="40vh">
//                 <Table size="sm">
//                   <Thead>
//                     <Tr>
//                       <Th color="yellow.200" fontSize="14px">
//                         My Events
//                       </Th>
//                       <Th color="yellow.200" fontSize="14px">
//                         Date
//                       </Th>
//                     </Tr>
//                   </Thead>
//                   <Tbody>
//                     {managerEvents.map((event) => (
//                       <Tr
//                         key={event.id}
//                         onClick={() => handleEventDetails(event.id)}
//                       >
//                         <Td
//                           color="gray.400"
//                           fontSize="12px"
//                           fontWeight="bold"
//                         >
//                           {event.event_title}
//                         </Td>
//                         <Td color="gray.400" fontSize="12px">
//                           {dayjs(event.event_date).format("MM/DD/YY")}
//                         </Td>
//                       </Tr>
//                     ))}
//                   </Tbody>
//                 </Table>
//               </TableContainer>
//             </Center>
//           </TabPanel>
//           <TabPanel>
//             <Center>
//               <TableContainer w="35vh">
//                 <Table size="sm">
//                   <Thead>
//                     <Tr>
//                       <Th color="yellow.200" fontSize="14">
//                         Organization Members
//                       </Th>
//                     </Tr>
//                   </Thead>
//                   <Tbody>
//                     {members.map((member) => (
//                       <Tr
//                         key={member.id}
//                         onClick={() => handleMemberProfile(member.member)}
//                       >
//                         <Td
//                           _hover={{ color: "yellow" }} // Apply the hover effect using _hover prop
//                           color="gray.400"
//                           fontSize="12px"
//                           fontWeight="bold"
//                         >
//                           <Flex align="center">
//                             {" "}
//                             {/* Wrap Avatar and name inside Flex */}
//                             <Avatar
//                               size="sm"
//                               src={member.user_avatar}
//                               name={member.member_full_name}
//                               mr="2"
//                             />
//                             <span>{member.member_full_name}</span>
//                             {/* <span>{member.member}</span> */}
//                           </Flex>
//                         </Td>
//                       </Tr>
//                     ))}
//                   </Tbody>
//                 </Table>
//               </TableContainer>
//             </Center>
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </Flex>
//   </>
// );
// };

// export default Main;
