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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import cnctr_yellow from "../assets/cnctr_yellow.svg";

const LoginRole = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = "https://safe-connected.onrender.com/";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    axios
      .post(`${baseURL}auth/token/login`, {
        username: username.toLowerCase(),
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
            setUser(token, username, role);
            console.log(`hi my role is ${role}`);
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };

  return (
    <>
      <Center w="100%" h="92vh" bgColor="gray.800">
        <Stack as={Box} textAlign={"center"} spacing={{ base: 2, md: 2 }}>
          <Center>
            <Box>
              <Image
                src={cnctr_yellow}
                alt="Logo"
                width="600px"
                height="600px"
              />

              <Heading
                mt="-120px"
                mb="50px"
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
            </Box>
          </Center>
          <form onSubmit={handleSubmit}>
            <FormControl>
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
              <Center mt="6">
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

              <Box>
                <Button
                  mt="10"
                  onClick={handleSubmit}
                  type="submit"
                  value="Log In"
                >
                  Login
                </Button>
              </Box>
            </FormControl>
          </form>
        </Stack>
      </Center>
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
