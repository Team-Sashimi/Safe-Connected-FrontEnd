import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Center,
  Text,
  Button,
  Flex,
  Avatar,
  Container,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const EditUserProfile = ({ token, username, userRole }) => {
  const baseURL = "https://safe-connected.onrender.com/";

  return (
    <>
      <Center bgColor="gray.800" h="100vh">
        <Heading color="yellow.200">{username} edit profile page</Heading>
      </Center>
    </>
  );
};

export default EditUserProfile;
