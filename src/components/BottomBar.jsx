import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { FiHome, FiSearch, FiUser, FiPlus, FiCalendar } from "react-icons/fi";

const BottomBar = ({ username, token, userRole }) => {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="10%"
      right="10%"
      height="5%"
      //   background="gray.200"
      boxShadow="lg"
      borderRadius="xl"
      p="1"
      mb="4"
    >
      <Flex justify="space-around" align="center" h="100%">
        <Icon as={FiPlus} color="yellow.200" boxSize="5" />
        <Icon as={FiHome} color="yellow.200" boxSize="5" />
        <Icon as={FiCalendar} color="yellow.200" boxSize="5" />
        <Icon as={FiUser} color="yellow.200" boxSize="5" />
      </Flex>
    </Box>
  );
};

export default BottomBar;
