import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Center,
  Text,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import UploadFile from "./UploadFile";

const ClientRegistration = ({ token, username }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <Center bgColor="gray.800" h="100vh">
        <Container className="login">
          <UploadFile token={token} username={username} />
          <form>
            <FormControl>
              <div>
                <FormLabel mt="10" color="yellow.200" htmlFor="name">
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={firstName}
                  color="whiteAlpha.600"
                  // as the value in input changes, it's setting the value to setUserName
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <FormLabel mt="4" color="yellow.200" htmlFor="password">
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  name="last-name"
                  id="last-name"
                  color="whiteAlpha.600"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <FormLabel mt="4" color="yellow.200" htmlFor="password">
                  Email
                </FormLabel>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  color="whiteAlpha.600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FormLabel color="yellow.200" mt="4">
                  Select Language
                </FormLabel>
                <Select
                  color="whiteAlpha.600"
                  placeholder="Languages"
                  onChange={(e) => handleChange("language", e)}
                >
                  <option value="1">English</option>
                  <option value="2">Spanish</option>
                  <option value="3">French</option>
                </Select>
              </div>
              <div>
                <Button mt="20" type="submit" value="Update Profile">
                  Register
                </Button>
              </div>
            </FormControl>
          </form>
        </Container>
      </Center>
    </>
  );
};

export default ClientRegistration;

//            Post request to endpoint to register a client to an organization
