import React from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { FiHome, FiList, FiUser, FiPlus, FiCalendar } from "react-icons/fi";
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
              color={location.pathname === "/" ? "grey.600" : "green.500"}
              boxSize="5"
            />
            <Text
              color={location.pathname === "/" ? "grey.600" : "green.500"}
              fontSize="10px"
            >
              Home
            </Text>
          </Flex>
        </Link>
        <Link to="/search-events">
          <Flex flexDirection="column" align="center">
            <Icon
              as={FiList}
              color={
                location.pathname === "/search-events"
                  ? "grey.600"
                  : "green.500"
              }
              boxSize="5"
            />
            <Text
              color={
                location.pathname === "/search-events"
                  ? "grey.600"
                  : "green.500"
              }
              fontSize="10px"
            >
              Events
            </Text>
          </Flex>
        </Link>
        <Link to="/account">
          <Flex flexDirection="column" align="center">
            <Icon
              as={FiUser}
              color={
                location.pathname === "/account" ? "grey.600" : "green.500"
              }
              boxSize="5"
            />
            <Text
              color={
                location.pathname === "/account" ? "grey.600" : "green.500"
              }
              fontSize="10px"
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

{
  /* {userRole === "Manager" && (
          <Link to="/create">
            <Icon
              as={FiPlus}
              color={location.pathname === "/create" ? "blue.500" : "gray.800"}
              boxSize="5"
            />
          </Link>
        )} */
}
