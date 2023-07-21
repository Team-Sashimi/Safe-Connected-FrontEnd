import axios from "axios";
import { useState } from "react";
import { Center, Heading, Text, Stack, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
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
        setUser(token, username);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Center h="80vh">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color={"yellow.500"}
          >
            Safe. Connected. <br />
            <Text as={"span"} color={"yellow.500"}>
              Resources & Services.
            </Text>
          </Heading>
          <div className="login">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Username: </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={username}
                  // as the value in input changes, it's setting the value to setUserName
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password: </label>
                <input
                  type="password"
                  name="password-name"
                  id="password-register"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <input type="submit" value="Log In" />
              </div>
            </form>
          </div>
        </Stack>
      </Center>
    </>
  );
};

export default Login;
