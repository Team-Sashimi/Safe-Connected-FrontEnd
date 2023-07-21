import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Heading, Center, Text, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const ClientRegistration = ({ token, username }) => {
  const baseURL = "https://safe-connected.onrender.com/";

  return (
    <>
      <Center m="10">
        <Box>
          <Heading as="h4" size="md">
            Welcome {username} Register Your Client Below.
          </Heading>
          <Text>
            Post request to endpoint to register a client to an organization
          </Text>
          <Text>Create form, what keys? </Text>
        </Box>
      </Center>
    </>
  );
};

export default ClientRegistration;
