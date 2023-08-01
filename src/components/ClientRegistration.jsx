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

const ClientRegistration = ({ token }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [newClient, setNewClient] = useState([]);

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${baseURL}auth/users/`, {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
        language: language,
        // user_avatar: avatar,
        role: role,
      })
      .then((res) => {
        setNewClient(res.data);
        console.log("hi");
      });
  };

  return (
    <>
      <Center bgColor="gray.800" h="100vh">
        <Container className="login">
          <Heading color="yellow.200">Register a client</Heading>
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
                <FormLabel mt="4" color="yellow.200" htmlFor="password">
                  Username
                </FormLabel>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  color="whiteAlpha.600"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <FormLabel mt="4" color="yellow.200" htmlFor="password">
                  Password
                </FormLabel>
                <Input
                  type="password"
                  name="email"
                  id="email"
                  color="whiteAlpha.600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <FormLabel color="yellow.200" mt="4">
                  Select Language
                </FormLabel>
                <Select
                  color="whiteAlpha.600"
                  placeholder="Languages"
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="sw">Swahili</option>
                </Select>
                <FormLabel color="yellow.200" mt="4">
                  Select Role
                </FormLabel>
                <Select
                  color="whiteAlpha.600"
                  placeholder="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Client">Client</option>
                  <option value="Manager">Manager</option>
                </Select>
              </div>
              <div>
                <Button
                  onClick={handleRegister}
                  mt="20"
                  type="submit"
                  value="Update Profile"
                >
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
