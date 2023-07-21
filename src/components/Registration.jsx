import axios from "axios";
import { useState } from "react";
import Login from "./Login";
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
        role: role,
      })
      .then((res) => {
        const role = res.data.role;
        setUserRole(role);
        console.log(role);
        console.log("hi");
        navigate("/login");
      });
  };

  return (
    <>
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
    </>
  );
};

export default Registration;