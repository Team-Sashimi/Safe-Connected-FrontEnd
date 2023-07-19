import { useState } from "react";
import axios from "axios";
import { Flex, Center } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import { Footer } from "./Componentz/Footer";
import { Main } from "./Componentz/Main";
import { Navbar } from "./Componentz/Navbar";
import Login from "./Componentz/Login";
import CreateEvent from "./Componentz/CreateEvent";
import { Routes, Route } from "react-router-dom";

function App() {
  const [token, setToken] = useLocalStorageState("userToken", "");
  const [username, setUsername] = useLocalStorageState("userName", "");
  const baseURL = "https://safe-connected.onrender.com/";

  const setUser = (token, username) => {
    setToken(token);
    setUsername(username);
  };

  console.log(token);
  console.log(username);

  return (
    <Flex
      direction="column"
      minHeight="100vh"
      style={{ backgroundColor: "grey" }}
    >
      <Navbar />
      <Flex direction="column" flex="1">
        {token ? (
          <>
            <Routes>
              <Route
                path="/"
                element={<Main username={username} token={token} />}
              />
              <Route
                path="/create-event"
                element={<CreateEvent username={username} token={token} />}
              />
            </Routes>
          </>
        ) : (
          <>
            <Center flex="1">
              <Login setUser={setUser} />
            </Center>
          </>
        )}
      </Flex>
      <Footer />
    </Flex>
  );
}

export default App;
