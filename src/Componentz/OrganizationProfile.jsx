import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Container,
  Box,
  Heading,
  Input,
  Center,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const OrganizationProfile = ({ token, username }) => {
  const [orgInfo, setOrgInfo] = useState([]);
  const { orgID } = useParams();

  const baseURL = "https://safe-connected.onrender.com/";

  useEffect(() => {
    axios
      .get(`${baseURL}organization/${orgID}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setOrgInfo(res.data);
        console.log("axios request");
      });
  }, [token]);

  console.log(orgID);
  return (
    <>
      <Box border="1px solid black" borderRadius="md" p="4" m="4">
        <Center>
          <Box
            key={orgInfo.id}
            maxWidth="400px"
            border="1px solid black"
            borderRadius="md"
            p="4"
            m="10"
          >
            <Box as="event-card" key={orgInfo.id}>
              <Heading as="h4" size="md">
                {orgInfo.org_name}
              </Heading>
              <Text>{orgInfo.org_notes}</Text>
              <Text>Located at:</Text>
              <Text>
                {orgInfo.street_number} {orgInfo.street_name}
              </Text>
              <Text>
                {orgInfo.city} {orgInfo.state}, {orgInfo.zipcode}
              </Text>
              <Text>{orgInfo.phone}</Text>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
};

export default OrganizationProfile;
