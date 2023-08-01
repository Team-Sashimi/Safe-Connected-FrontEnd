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

const ClientProfile = ({ token, username, userRole, orgDetails }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [profile, setProfile] = useState([]);
  const { memberID } = useParams();

  useEffect(() => {
    axios
      .get(`${baseURL}user/${memberID}/`, {
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
      <Center
        h="100vh"
        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
      >
        <Box>
          <Center>
            {/* <UploadFile token={token} username={username} /> */}
            <Avatar
              size="xl"
              name={profile.full_name}
              mb="5"
              src={profile.user_avatar}
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
