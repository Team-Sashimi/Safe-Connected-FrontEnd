import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Container,
  Box,
  Heading,
  Input,
  Center,
  Text,
} from "@chakra-ui/react";

const OrganizationList = ({ token, username }) => {
  const [allOrgs, setAllOrgs] = useState([]);
  const navigate = useNavigate();
  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}organization`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setAllOrgs(res.data);
      });
  }, [token]);

  return (
    <Flex as="all-orgs" role="all-orgs" direction="column" flex="2" py="6">
      <Container as="container-for-events" maxW="900px" flex="1">
        <Box>
          <Flex direction="column" align="center">
            <Heading color="yellow.500">
              THIS PAGE SHOWS ALL ORGANIZATIONS
            </Heading>
            <Input
              my="8"
              variant="filled"
              placeholder="Search Event"
              size="md"
            />
          </Flex>
        </Box>
        <Center>
          <Flex direction="column">
            <Box border="1px solid black" borderRadius="md" p="4" m="4">
              {allOrgs.map((org) => (
                <Box
                  maxWidth="400px"
                  border="1px solid black"
                  borderRadius="md"
                  p="4"
                  m="10"
                >
                  <Box as="event-card" key={org.id}>
                    <Heading as="h4" size="md">
                      {org.org_name}
                    </Heading>
                    <Text>{org.org_notes}</Text>
                    <Text>Located at:</Text>
                    <Text>
                      {org.street_number} {org.street_name}
                    </Text>
                    <Text>
                      {org.city} {org.state}, {org.zipcode}
                    </Text>
                    <Text>{org.phone}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          </Flex>
        </Center>
      </Container>
    </Flex>
  );
};

export default OrganizationList;
