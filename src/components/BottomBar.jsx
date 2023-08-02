import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import {
  FiHome,
  FiList,
  FiUser,
  FiPlus,
  FiCalendar,
  FiInfo,
  FiUsers,
} from "react-icons/fi";

import { Link, useLocation } from "react-router-dom";

const BottomBar = ({ username, token, userRole }) => {
  const location = useLocation();
  return (
    <Box
      position="absolute"
      bottom="0"
      w="100%"
      height="7%"
      bgGradient="linear-gradient(159.02deg, #faf189 14.25%, #faf17e 56.45%, #faf189 86.14%)"
      boxShadow="lg"
      borderTopRadius="xl"
      p="1"
    >
      <Flex justifyContent="space-around" align="center" h="100%">
        <Link to="/">
          <Flex flexDirection="column" align="center">
            <Icon
              as={FiHome}
              color={location.pathname === "/" ? "#050e76" : "#050e76"}
              boxSize="5"
            />
            <Text
              color={location.pathname === "/" ? "#050e76" : "#050e76"}
              fontSize="10px"
              fontWeight={location.pathname === "/" ? "bold" : "light"}
            >
              Home
            </Text>
          </Flex>
        </Link>
        {userRole === "Client" && (
          <Link to="/all-events">
            <Flex flexDirection="column" align="center">
              <Icon
                as={FiList}
                color={
                  location.pathname === "/all-events" ? "#050e76" : "#050e76"
                }
                boxSize="5"
              />
              <Text
                color={
                  location.pathname === "/all-events" ? "#050e76" : "#050e76"
                }
                fontWeight={
                  location.pathname === "/all-events" ? "bold" : "light"
                }
                fontSize="10px"
              >
                Sign Ups
              </Text>
            </Flex>
          </Link>
        )}
        {userRole === "Client" && (
          <Link to="/org">
            <Flex flexDirection="column" align="center">
              <Icon
                as={FiInfo}
                color={location.pathname === "/org" ? "#050e76" : "#050e76"}
                boxSize="5"
              />
              <Text
                color={location.pathname === "/org" ? "#050e76" : "#050e76"}
                fontWeight={location.pathname === "/org" ? "bold" : "light"}
                fontSize="10px"
              >
                Org Details
              </Text>
            </Flex>
          </Link>
        )}

        {userRole === "Manager" && (
          <Link to="/create">
            <Flex flexDirection="column" align="center">
              <Icon
                as={FiPlus}
                color={location.pathname === "/create" ? "#050e76" : "#050e76"}
                boxSize="5"
              />
              <Text
                color={location.pathname === "/org" ? "#050e76" : "#050e76"}
                fontWeight={location.pathname === "/org" ? "bold" : "light"}
                fontSize="10px"
              >
                Create
              </Text>
            </Flex>
          </Link>
        )}

        {userRole === "Manager" && (
          <Link to="/members">
            <Flex flexDirection="column" align="center">
              <Icon
                as={FiUsers}
                color={location.pathname === "/members" ? "#050e76" : "#050e76"}
                boxSize="5"
              />
              <Text
                color={location.pathname === "/members" ? "#050e76" : "#050e76"}
                fontWeight={location.pathname === "/members" ? "bold" : "light"}
                fontSize="10px"
              >
                Members
              </Text>
            </Flex>
          </Link>
        )}

        <Link to="/account">
          <Flex flexDirection="column" align="center">
            <Icon
              as={FiUser}
              color={location.pathname === "/account" ? "#050e76" : "#050e76"}
              boxSize="5"
            />
            <Text
              color={location.pathname === "/account" ? "#050e76" : "#050e76"}
              fontSize="10px"
              fontWeight={location.pathname === "/account" ? "bold" : "light"}
            >
              Profile
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
};

export default BottomBar;

// {userRole === "Manager" && (
//   <Link to="/search-events">
//     <Flex flexDirection="column" align="center">
//       <Icon
//         as={FiList}
//         color={
//           location.pathname === "/search-events"
//             ? "grey.600"
//             : "green.500"
//         }
//         boxSize="5"
//       />
//       <Text
//         color={
//           location.pathname === "/search-events"
//             ? "grey.600"
//             : "green.500"
//         }
//         fontSize="10px"
//       >
//         Events
//       </Text>
//     </Flex>
//   </Link>
// )}
