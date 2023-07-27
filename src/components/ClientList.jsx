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
    navigate(`/clients/${userID}`);
  };
  return (
    <>
      <Center bgColor="gray.800" h="100vh">
        <Box>
          <Box>
            <Center>
              <Flex direction="column" alignItems="center" ml="4">
                <Heading color="yellow.200" as="h4" size="lg" mb="1">
                  {orgDetails.org_name}
                </Heading>
                <Heading color="yellow.200" as="h4" size="md">
                  Clients{" "}
                </Heading>

                <Link to="/register-client">
                  <Button m="4">Register Client</Button>
                </Link>
              </Flex>
            </Center>
          </Box>
          {userList.length > 0 ? (
            <Box>
              <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing="5" mt="10">
                {userList.map((user, index) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    pl="4"
                    m="10"
                  >
                    <Flex direction="column" alignItems="center" ml="4">
                      <Avatar size="xl" mb="3" src={user.member} />
                      <Heading
                        color="whiteAlpha.800"
                        as="h4"
                        size="md"
                        onClick={() => handleUserID(user.member)}
                      >
                        <Link> {user.member}</Link>
                      </Heading>
                    </Flex>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          ) : (
            <Text color="white">No clients.</Text>
          )}
        </Box>
      </Center>
    </>
  );
};

export default ClientList;
