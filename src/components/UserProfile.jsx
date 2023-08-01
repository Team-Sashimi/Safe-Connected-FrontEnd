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
  SimpleGrid,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import UploadFile from "./UploadFile";

const UserProfile = ({ token, username, userRole, orgDetails }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [userDetails, setUserDetails] = useState([]);
  const [avatar, setAvatar] = useState([]);

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

  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}uploads/`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setAvatar(res.data);
  //     });
  // }, [token]);

  console.log(userDetails);
  return (
    <>
      <SimpleGrid
        h="100vh"
        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
        rows={2}
        spacing={4}
        // maxChildHeight="100px"
      >
        <Box
          // backgroundColor="gray.200"
          borderRadius="20px"
          overflow="auto"
          p="4"
          mt="25vh"
        >
          <Center>
            <Avatar
              size="xl"
              name={username}
              mb="5"
              src={userDetails.user_avatar}
            />
          </Center>
          <Center>
            <Flex direction="column" align="center">
              <Heading mt="4" size="lg" color="yellow.200">
                {userDetails.first_name} {userDetails.last_name}
              </Heading>
              <Heading mt="1" size="sm" color="gray.400">
                {userDetails.email}
              </Heading>
              <Heading mt="4" size="sm" color="yellow.200">
                {userRole}
              </Heading>

              <Link to="/edit-account">
                <Button size="xs" backgroundColor="yellow.200" m="4">
                  Edit Info
                </Button>
              </Link>
            </Flex>
          </Center>
        </Box>
      </SimpleGrid>
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

// <Center bgColor="gray.800" h="100vh">
// <Flex as="main" role="main" direction="column" flex="2" py="3">
//   <Container maxW="900px" flex="1">
//     <Box>
//       <Center>
//         {/* <UploadFile token={token} username={username} /> */}
//         <Avatar
//           size="xl"
//           name={username}
//           mb="5"
//           // src="https://example.com/avatar.jpg"
//         />
//       </Center>
//       <Center>
//         <Flex direction="column" align="center">
//           <Heading mt="4" size="lg" color="yellow.200">
//             {userDetails.first_name} {userDetails.last_name}
//           </Heading>
//           <Heading mt="4" size="sm" color="yellow.200">
//             {userRole} at {orgDetails.org_name}
//           </Heading>
//           <Heading mt="1" size="sm" color="yellow.200">
//             {userDetails.email}
//           </Heading>
//         </Flex>
//       </Center>
//     </Box>
//     <Box m="5">
//       <Center>
//         <Flex align="center">
//           {userRole === "Manager" && (
//             <Link to="/clients">
//               <Button backgroundColor="yellow.400" m="4">
//                 Clients
//               </Button>
//             </Link>
//           )}
//           <Link to="/your-events">
//             <Button backgroundColor="yellow.400" m="4">
//               Events
//             </Button>
//           </Link>
//           <Link to="/edit-account">
//             <Button backgroundColor="yellow.400" m="4">
//               Edit Info
//             </Button>
//           </Link>
//         </Flex>
//       </Center>
//     </Box>
//   </Container>
// </Flex>
// </Center>
// </>
