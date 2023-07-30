import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { FiHome, FiSearch, FiUser, FiPlus, FiCalendar } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const BottomBar = ({ username, token, userRole }) => {
  const location = useLocation();

  return (
    <Box
      position="fixed"
      bottom="0"
      w="100%"
      height="8%"
      bgGradient="linear-gradient(159.02deg, #faf189 14.25%, #faf17e 56.45%, #faf189 86.14%)"
      boxShadow="lg"
      borderTopRadius="xl"
      p="1"
    >
      <Flex justify="space-around" align="center" h="100%">
        {userRole === "Manager" && (
          <Link to="/create">
            <Icon
              as={FiPlus}
              color={location.pathname === "/create" ? "blue.500" : "gray.800"}
              boxSize="5"
            />
          </Link>
        )}
        <Link to="/">
          <Icon
            as={FiHome}
            color={location.pathname === "/" ? "blue.500" : "gray.800"}
            boxSize="5"
          />
        </Link>
        <Link to="/search-events">
          <Icon
            as={FiCalendar}
            color={
              location.pathname === "/search-events" ? "blue.500" : "gray.800"
            }
            boxSize="5"
          />
        </Link>
        <Link to="/account">
          <Icon
            as={FiUser}
            color={location.pathname === "/account" ? "blue.500" : "gray.800"}
            boxSize="5"
          />
        </Link>
      </Flex>
    </Box>
  );
};

export default BottomBar;
