import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Heading, Center, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const UserProfile = ({ token, username }) => {
  const baseURL = "https://safe-connected.onrender.com/";

  return (
    <>
      <Center m="10">
        <Box>
          <Heading as="h4" size="md">
            {username} Profile
          </Heading>
        </Box>
      </Center>
    </>
  );
};

export default UserProfile;
