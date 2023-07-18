import { useState } from "react";
import { Flex, Center } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import { Footer } from "./Componentz/Footer";
import { Main } from "./Componentz/Main";
import { Navbar } from "./Componentz/Navbar";
import Login from "./Componentz/Login";

function App() {
  const [token, setToken] = useLocalStorageState("userToken", "");
  const [username, setUsername] = useLocalStorageState("userName", "");

  const setUser = (token, username) => {
    setToken(token);
    setUsername(username);
  };

  console.log(token);
  console.log(username);

  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Flex direction="column" flex="1">
        {token ? (
          <>
            <Main username={username} token={token} />
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
