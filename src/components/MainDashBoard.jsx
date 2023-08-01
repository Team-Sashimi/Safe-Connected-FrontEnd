import {
  Container,
  Flex,
  Heading,
  Box,
  Center,
  Text,
  Input,
  Button,
  Grid,
  Avatar,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import UploadFile from "./UploadFile";

const MainDashBoard = ({ username, token, userRole }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [orgDetails, setOrgDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}organization/1/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setOrgDetails(res.data);
      });
  }, [token]);

  return (
    <Center bgColor="gray.800" h="92vh">
      <Flex as="main" role="main" direction="column" flex="2" py="3">
        <Container maxW="900px" flex="1">
          <MainDashBoard />
          <Box>
            <Center>
              <Avatar
                size="xl"
                name={username}
                mb="10"
                // src="https://example.com/avatar.jpg"
              />
            </Center>
            <Heading>HHIII</Heading>
          </Box>
        </Container>
      </Flex>
    </Center>
  );
};

export default MainDashBoard;
