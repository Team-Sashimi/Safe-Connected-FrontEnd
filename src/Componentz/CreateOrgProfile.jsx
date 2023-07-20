import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  FormControl,
  FormLabel,
  Textarea,
  Select,
} from "@chakra-ui/react";

const CreateOrgProfile = ({ token, username, userID }) => {
  const [orgName, setOrgName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [orgNotes, setOrgNotes] = useState("");

  const navigate = useNavigate();

  const baseURL = "https://safe-connected.onrender.com/";

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${baseURL}organization/create/`,
        {
          org_name: orgName,
          street_number: streetNumber,
          street_name: streetName,
          city: city,
          zipcode: zip,
          org_notes: orgNotes,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOrgName("");
        setStreetNumber("");
        setStreetName("");
        setCity("");
        setZip("");
        setOrgNotes("");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (userInput, e) => {
    if (userInput === "orgName") {
      setOrgName(e.target.value);
      console.log(orgName);
    }
    if (userInput === "streetNumber") {
      setStreetNumber(e.target.value);
    }
    if (userInput === "streetName") {
      setStreetName(e.target.value);
    }
    if (userInput === "city") {
      setCity(e.target.value);
      console.log(city);
    }
    if (userInput === "zip") {
      setZip(e.target.value);
    }
    if (userInput === "orgNotes") {
      setOrgNotes(e.target.value);
    }
  };

  console.log(username);

  return (
    <>
      <Flex
        as="CreateEvent"
        role="createEvent"
        direction="column"
        flex="2"
        py="6"
      >
        <Container maxW="900px" flex="1">
          <Box>
            <Center>
              <Flex direction="column" align="center">
                <Heading color="blackAlpha.500">
                  Register Organization On This Page
                </Heading>
                <Text color="blackAlpha.500">{username}</Text>
                <Box my="8">
                  <form onSubmit={handleSubmit}>
                    <FormControl>
                      <FormLabel>Name of Org</FormLabel>
                      <Input
                        my="2"
                        variant="filled"
                        placeholder="Name of Org"
                        size="md"
                        onChange={(e) => handleChange("orgName", e)}
                      />
                      <FormLabel mt="4">Org Notes</FormLabel>
                      <Textarea
                        my="2"
                        variant="filled"
                        placeholder="General Notes"
                        size="md"
                        onChange={(e) => handleChange("orgNotes", e)}
                      />
                      <FormLabel mt="4">Street Number</FormLabel>
                      <Input
                        size="md"
                        variant="filled"
                        onChange={(e) => handleChange("streetNumber", e)}
                      />
                      <FormLabel mt="4">Street Name</FormLabel>
                      <Input
                        size="md"
                        variant="filled"
                        onChange={(e) => handleChange("streetName", e)}
                      />
                      <FormLabel mt="4">City</FormLabel>
                      <Input
                        size="md"
                        variant="filled"
                        onChange={(e) => handleChange("city", e)}
                      />
                      <FormLabel mt="4">Zipcode</FormLabel>
                      <Input
                        size="md"
                        variant="filled"
                        onChange={(e) => handleChange("zip", e)}
                      />
                      <Box>
                        <FormLabel mt="4">Upload Image Here.</FormLabel>
                        <Input p="2" type="file" variant="filled"></Input>
                      </Box>
                      <Input
                        cursor="pointer"
                        mt="6"
                        size="md"
                        type="submit"
                        variant="filled"
                      />
                    </FormControl>
                  </form>
                </Box>
                <Box as="org-preview">
                  <Text>{orgName}</Text>
                  <Text>{orgNotes}</Text>
                  <br></br>
                  <Text>
                    {streetNumber} {streetName}
                  </Text>
                  <Text>
                    {city} {zip}
                  </Text>
                </Box>
              </Flex>
            </Center>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default CreateOrgProfile;

//"end_time": "2023-07-18 09:30"
