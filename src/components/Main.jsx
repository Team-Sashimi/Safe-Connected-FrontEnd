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

export const Main = ({ username, token, userRole }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [orgDetails, setOrgDetails] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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

  // const handleUploadFile = () => {
  //   axios
  //     .post(
  //       `${baseURL}uploads/`,
  //       { file: fileUpload },
  //       {
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("you uploaded an file!");
  //       setFileUpload("");
  //       // navigate("/");
  //     })
  //     .catch((error) => {
  //       console.log("error");
  //     });
  // };

  return (
    <Center bgColor="gray.800" h="100vh">
      <Flex as="main" role="main" direction="column" flex="2" py="3">
        <Container maxW="900px" flex="1">
          <Box>
            <Center>
              {/* <Avatar
                size="xl"
                name={username}
                mb="10"
                // src="https://example.com/avatar.jpg"
              /> */}
              <UploadFile token={token} username={username} />
              {/* <Center>
                <InputGroup>
                  <AddIcon type="file" color="gray.300" cursor="pointer" />
                </InputGroup>
              </Center> */}
            </Center>
            <Center>
              <Flex direction="column" align="center">
                <Heading color="yellow.200">Welcome! {username}</Heading>
                <Heading mt="4" size="md" color="yellow.200">
                  {userRole} at {orgDetails.org_name}
                </Heading>
              </Flex>
            </Center>
          </Box>
          <Box m="5">
            <Center>
              <Flex align="center">
                {userRole === "Manager" && (
                  <Link to="/clients">
                    <Button backgroundColor="yellow.400" m="4">
                      Clients
                    </Button>
                  </Link>
                )}
                <Link to="/search-events">
                  <Button backgroundColor="yellow.400" m="4">
                    Events
                  </Button>
                </Link>
                <Link to="/account">
                  <Button backgroundColor="yellow.400" m="4">
                    Account
                  </Button>
                </Link>
              </Flex>
            </Center>
          </Box>
        </Container>
      </Flex>
    </Center>
  );
};

{
  /* <Center>
<Flex direction="column">
  {events.map((event) => (
    <>
      <Box maxW="400px" as="event-card" key={event.title}>
        <Heading as="h4" size="md">
          {event.event_title}
        </Heading>
        <Text>{event.general_notes}</Text>
        <Text>
          {dayjs(event.start_time).format("MMMM D, YYYY h:mm A")} -
          {dayjs(event.end_time).format("h:mm A")}
        </Text>
        <Text>{event.event_organization}</Text>
        <Text>{event.privacy}</Text>
      </Box>
    </>
  ))}
</Flex>
</Center> */
}
