import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Center,
  Text,
  Button,
  SimpleGrid,
  Flex,
  Avatar,
  Skeleton,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const ClientList = ({ token, username, orgDetails }) => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}org/1/clients/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setUserList(res.data);
      });
  }, [token]);

  console.log(userList);

  const handleUserID = (userID) => {
    console.log(`hi this client has an id: ${userID}`);
    navigate(`/member/${userID}`);
  };
  return (
    <Flex
      flexDirection="column"
      h="100vh"
      bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #1E2065 56.45%, #020515 86.14%)"
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt="14vh"
      >
        <Heading color="whiteAlpha.800" as="h1" fontSize="24px">
          {orgDetails.org_name} Members
        </Heading>
        <Link to="/register-client">
          <Button mt="5" size="md" colorScheme="yellow" fontWeight="bold">
            Register
          </Button>
        </Link>
      </Flex>

      <Flex
        mt="8vh"
        overflow="auto"
        maxHeight="510px"
        justifyContent="center"
        alignItems="center"
      >
        {userList.length > 0 ? (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gap={3}
          >
            {userList.map((user) => (
              <Box
                key={user.id}
                cursor="pointer"
                p={3}
                mb="2"
                bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
                color="whiteAlpha.800"
                height="125px"
                w="150px"
                boxShadow="md"
                rounded="md"
                onClick={() => handleUserID(user.member)}
              >
                <Flex direction="column" alignItems="center">
                  <Avatar size="lg" mb="3" src={user.user_avatar} />
                  <Heading fontSize="14px">{user.member_full_name}</Heading>
                </Flex>
              </Box>
            ))}
          </Flex>
        ) : (
          <>
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={3}
            >
              <Skeleton height="125px" width="125px" mb="2" />
              <Skeleton height="125px" width="125px" mb="2" />
              <Skeleton height="125px" width="125px" mb="2" />
              <Skeleton height="125px" width="125px" mb="2" />
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ClientList;

// <>
// <Center bgColor="gray.800" h="100vh">
//   <Box>
//     <Box>
//       <Center>
//         <Flex direction="column" alignItems="center" ml="4">
//           <Heading color="yellow.200" as="h4" size="lg" mb="1">
//             {orgDetails.org_name}
//           </Heading>
//           <Heading color="yellow.200" as="h4" size="md">
//             Clients{" "}
//           </Heading>

//           <Link to="/register-client">
//             <Button m="4">Register Client</Button>
//           </Link>
//         </Flex>
//       </Center>
//     </Box>
//     {userList.length > 0 ? (
//       <Box>
//         <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="5" mt="10">
//           {userList.map((user, index) => (
//             <Box
//               key={index}
//               display="flex"
//               alignItems="center"
//               pl="4"
//               m="10"
//             >
//               <Flex direction="column" alignItems="center" ml="4">
//                 <Avatar size="xl" mb="3" src={user.user_avatar} />
//                 <Heading
//                   color="yellow.200"
//                   as="h4"
//                   size="md"
//                   onClick={() => handleUserID(user.member)}
//                 >
//                   <Link color="yellow.200"> {user.member_full_name}</Link>
//                 </Heading>
//               </Flex>
//             </Box>
//           ))}
//         </SimpleGrid>
//       </Box>
//     ) : (
//       <Text color="white">No clients.</Text>
//     )}
//   </Box>
// </Center>
// </>
