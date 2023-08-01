import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
  Flex,
  Avatar,
  InputGroup,
  Icon,
  SimpleGrid,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { FiImage } from "react-icons/fi";

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
  const [avatar, setAvatar] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();

  const onCloseAlert = () => {
    setIsAlertOpen(false);
    navigate("/"); // Navigate to "/" after closing the alert
  };

  const onOpenAlert = () => {
    setIsAlertOpen(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post(
        `${baseURL}auth/users/`,
        {
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          password: password,
          language: language,
          user_avatar: avatar,
          role: role,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setNewClient(res.data);
        onOpenAlert();
        console.log("hi");
      })
      .catch((error) => {
        console.log("you suck");
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  console.log(avatar);

  return (
    <Flex
      h="100vh"
      bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
    >
      <Container h="30vh" w="75%" mt="10vh">
        <Flex
          w="100%"
          h="100%"
          borderRadius="15"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <Center>
            <Flex direction="">
              <Avatar size="xl" name={username} src={avatar} />

              <label>
                <InputGroup display="none">
                  <Input
                    size="xs"
                    border="none"
                    color="black"
                    type="file"
                    onChange={handleFileChange}
                  />
                </InputGroup>
                <Icon
                  color="white"
                  as={FiImage}
                  boxSize="24px"
                  cursor="pointer"
                />
              </label>
            </Flex>
          </Center>
          <Text mt="2" color="white">
            Update your avatar
          </Text>{" "}
        </Flex>

        <SimpleGrid columns={2} spacing={4}>
          <FormControl>
            <FormLabel color="yellow.200" fontSize="10px" mb="1">
              First Name
            </FormLabel>
            <Input
              placeholder="Enter name..."
              type="text"
              id="firstname"
              size="xs"
              bg="white"
              color="grey.800"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Last Name{" "}
            </FormLabel>
            <Input
              placeholder="Enter last name..."
              id="lastname"
              type="text"
              mt="-20px"
              size="xs"
              bg="white"
              color="grey.800"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="yellow.200" fontSize="10px" mb="1">
              Username
            </FormLabel>
            <Input
              placeholder="Enter username..."
              type="text"
              size="xs"
              bg="white"
              id="username"
              color="grey.800"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Password
            </FormLabel>
            <Input
              placeholder="Enter password.."
              id="password"
              type="password"
              size="xs"
              bg="white"
              color="grey.800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </SimpleGrid>
        <FormControl>
          <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
            Email
          </FormLabel>
          <Input
            placeholder="Enter email..."
            size="xs"
            type="text"
            bg="white"
            color="grey.800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
            Choose Language{" "}
          </FormLabel>
          <Select
            placeholder="Choose below"
            size="xs"
            bg="white"
            color="grey.800"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="sw">Swahili</option>
          </Select>
          <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
            Select Role
          </FormLabel>
          <Select
            placeholder="Role"
            size="xs"
            bg="white"
            color="grey.800"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Client">Client</option>
            <option value="Manager">Manager</option>
          </Select>
        </FormControl>
        <FormControl>
          <Center>
            <Button
              mt="4"
              size="xs"
              type="submit"
              colorScheme="green"
              onClick={handleRegister}
              cursor="pointer"
            >
              Register
            </Button>
          </Center>
        </FormControl>

        <AlertDialog isOpen={isAlertOpen} onClose={onCloseAlert}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Good job!</AlertDialogHeader>
            <AlertDialogBody>You have successfully registered.</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="green" onClick={onCloseAlert}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Container>
    </Flex>
  );
};

export default ClientRegistration;

//            Post request to endpoint to register a client to an organization

{
  /* <>
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
</> */
}
