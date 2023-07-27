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

const ClientProfile = ({ token, username, userRole, orgDetails }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [profile, setProfile] = useState([]);
  const { userID } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}user/${userID}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
      });
  }, [token]);

  console.log(profile);

  return (
    <>
      <Center bgColor="gray.800" h="100vh">
        <Box>
          <Center>
            {/* <UploadFile token={token} username={username} /> */}
            <Avatar
              size="xl"
              name={profile.full_name}
              mb="5"
              // src="https://example.com/avatar.jpg"
            />
          </Center>
          <Center>
            <Flex direction="column" align="center">
              <Heading mt="4" size="lg" color="yellow.200">
                {profile.first_name} {profile.last_name}
              </Heading>

              <Heading mt="1" size="sm" color="yellow.200">
                {profile.email}
              </Heading>
            </Flex>
          </Center>
        </Box>
      </Center>
    </>
  );
};

export default ClientProfile;

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
