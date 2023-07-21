import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Heading, Center, Text, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const ClientList = ({ token, username }) => {
  const baseURL = "https://safe-connected.onrender.com/";

  return (
    <>
      <Center m="10">
        <Box>
          <Heading as="h4" size="md">
            {username} List of Clients
          </Heading>
          <Link to="/register-client">
            <Button m="4">Register Client</Button>
          </Link>
          <Text>Map through endpoint to get clients from organization</Text>
        </Box>
      </Center>
    </>
  );
};

export default ClientList;
