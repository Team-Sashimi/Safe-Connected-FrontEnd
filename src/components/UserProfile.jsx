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
import UploadFile from "./UploadFile";

const UserProfile = ({ token, username, userRole }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}auth/users/me/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setUserDetails(res.data);
      });
  }, [token]);

  console.log(userDetails);

  return (
    <>
      <Center bgColor="gray.800" h="100vh">
        <Flex as="main" role="main" direction="column" flex="2" py="3">
          <Container maxW="900px" flex="1">
            <Box>
              <Center>
                {/* <UploadFile token={token} username={username} /> */}
                <Avatar
                  size="xl"
                  name={username}
                  mb="5"
                  // src="https://example.com/avatar.jpg"
                />
              </Center>
              <Center>
                <Flex direction="column" align="center">
                  <Heading mt="2" size="lg" color="yellow.200">
                    {userRole} Account Information
                  </Heading>
                  <Heading mt="4" size="sm" color="yellow.200">
                    {userDetails.first_name} {userDetails.last_name}
                  </Heading>
                  <Heading mt="1" size="sm" color="yellow.200">
                    {userDetails.email}
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
                  <Link to="/your-events">
                    <Button backgroundColor="yellow.400" m="4">
                      Events
                    </Button>
                  </Link>
                  <Link to="/edit-account">
                    <Button backgroundColor="yellow.400" m="4">
                      Edit Info
                    </Button>
                  </Link>
                </Flex>
              </Center>
            </Box>
          </Container>
        </Flex>
      </Center>
    </>
  );
};

export default UserProfile;

// const handleFile = () => {
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
