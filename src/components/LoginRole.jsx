import axios from "axios";
import { useState } from "react";
import {
  Center,
  Heading,
  Text,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Container,
  Flex,
  SimpleGrid,
  Select,
  Spinner,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import cnctr_yellow from "../assets/cnctr_yellow.svg";

const LoginRole = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const baseURL = "https://safe-connected.onrender.com/";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(username);
    console.log(password);
    axios
      .post(`${baseURL}auth/token/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.auth_token;
        axios
          .get(`${baseURL}auth/users/me`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            const role = res.data.role;
            const language = res.data.language;
            setUser(token, username, role, language);
            console.log(`hi my role is ${role} my language is ${language}`);
            navigate("/");
          })
          .catch((e) => {
            setLoading(false);
            setError(e.message);
          });
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          setError(e.response.data);
        } else {
          setError({ submit: e.message });
        }
        setLoading(false);
      });
  };

  return (
    <>
      <Container w="90%" h="100%">
        <Stack as={Box} textAlign={"center"} spacing={{ base: 2, md: 2 }}>
          <Center>
            <Box>
              <Heading
                mt="130px"
                mb="20px"
                fontWeight={600}
                fontSize="30px"
                lineHeight={"110%"}
                color={"yellow.200"}
              >
                Safe. Connected. <br />
                <Text as={"span"} color={"yellow.200"}>
                  Resources & Services.
                </Text>
              </Heading>
            </Box>
          </Center>

          <Flex
            direction="column"
            w="50&"
            h="100%"
            mt="-10"
            // borderColor="yellow.200"
          >
            <Box>
              <Text mt="10" fontSize="12px" color={"whiteAlpha.800"}>
                Login below, or email <strong>safenconnected@gmail.com</strong>{" "}
                to register your organization.
              </Text>
            </Box>
          </Flex>
          <SimpleGrid mt="5" columns={1} spacing={4}>
            <FormControl isInvalid={error.username ? true : false}>
              <FormLabel color="yellow.200" fontSize="12px" mb="1">
                Username
              </FormLabel>
              <Input
                placeholder="Enter username..."
                id="username"
                type="text"
                size="sm"
                color="whiteAlpha.800"
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormErrorMessage>{error.username}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                error.password || error.non_field_errors ? true : false
              }
            >
              <FormLabel color="yellow.200" fontSize="12px" mt="5" mb="1">
                Password
              </FormLabel>
              <Input
                placeholder="Enter password..."
                id="password"
                type="password"
                size="sm"
                color="whiteAlpha.800"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormErrorMessage>
                {error.password || error.non_field_errors}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <FormControl>
            <Center>
              <Button
                mt="4"
                size="sm"
                type="submit"
                onClick={handleSubmit}
                cursor="pointer"
                disabled={loading} // Disable the button while loading
              >
                {loading ? <Spinner size="sm" /> : "Login"}
              </Button>
            </Center>
          </FormControl>
        </Stack>
      </Container>
    </>
  );
};

export default LoginRole;

{
  /* <Center w="100%" h="92vh" bgColor="gray.800">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Center>
            <Box>
              <Image
                src={cnctr_yellow}
                alt="Logo"
                width="400px"
                height="400px"
              />
            </Box>
          </Center>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color={"whiteAlpha.800"}
          >
            Safe. Connected. <br />
            <Text as={"span"} color={"whiteAlpha.800"}>
              Resources & Services.
            </Text>
          </Heading>
          <div className="login">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <div>
                  <Center>
                    <FormLabel color="yellow.200" htmlFor="name" mr="20px">
                      Username:{" "}
                    </FormLabel>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      width="250px"
                      value={username}
                      color="white"
                      // as the value in input changes, it's setting the value to setUserName
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Center>
                </div>
                <div>
                  <Center>
                    <FormLabel
                      mt="4"
                      color="yellow.200"
                      htmlFor="password"
                      mr="20px"
                    >
                      Password:{" "}
                    </FormLabel>
                    <Input
                      type="password"
                      name="password-name"
                      id="password-register"
                      width="250px"
                      color="white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Center>
                </div>
                <div>
                  <Button
                    mt="10"
                    onClick={handleSubmit}
                    type="submit"
                    value="Log In"
                  >
                    Login
                  </Button>
                </div>
              </FormControl>
            </form>
          </div>
        </Stack>
      </Center> */
}
