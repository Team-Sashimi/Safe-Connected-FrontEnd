import axios from "axios";
import { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// to get a token
// form to make an account

const Registration = ({ setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const baseURL = "https://safe-connected.onrender.com/";
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${baseURL}auth/users/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log("hi");
        navigate("/login");
      });
  };

  return (
    <Flex
      h="100vh"
      bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
    >
      <Container h="30vh" w="75%" mt="13vh">
        <Flex
          w="100%"
          h="100%"
          borderRadius="15"
          justifyContent="center"
          flexDirection="column" // Use flexDirection to stack elements vertically
          alignItems="center" // Use alignItems to center elements horizontally
        >
          <Center>
            <Flex direction="">
              <Avatar size="xl" src={avatar} />

              {/* Hidden file input */}
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
          {/* Text component now appears below the Avatar, Input Group, and Icon */}
        </Flex>
        <SimpleGrid columns={1} spacing={4}>
          <FormControl>
            <FormLabel color="yellow.200" fontSize="10px" mb="1">
              First Name
            </FormLabel>
            <Input
              placeholder="Enter name..."
              type="text"
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
              type="text"
              mt="-20px"
              size="xs"
              bg="white"
              color="grey.800"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
            </Select>
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Email
            </FormLabel>
            <Input
              placeholder="Enter email..."
              size="xs"
              bg="white"
              color="grey.800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
        </SimpleGrid>
        <FormControl>
          <Center>
            <Button
              mt="4"
              size="xs"
              type="submit"
              colorScheme="green"
              onClick={handleEditAccount}
              cursor="pointer"
            >
              Update Profile
            </Button>
          </Center>
        </FormControl>
      </Container>
    </Flex>
  );
};

export default Registration;

{
  /* <>
      <Box>
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color={"yellow.200"}
        >
          Register an account here.
        </Heading>
        <form onSubmit={handleRegister}>
          <div>
            <label>
              <span>username: </span>
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="pick a username."
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <label>
              <span>password: </span>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="pick a password."
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label>
              <span>role: </span>
            </label>
            <input
              type="text"
              name="role"
              id="role"
              placeholder="Manager or Client"
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
            ></input>
          </div>
          <div>
            <Button type="submit">Submit!</Button>
          </div>
        </form>
      </Box>
    </> */
}
