import { useState } from "react";
import axios from "axios";
import { Flex, Center } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import { Footer } from "./Componentz/Footer";
import { Main } from "./Componentz/Main";
import { Navbar } from "./Componentz/Navbar";
import Login from "./Componentz/Login";
import CreateEvent from "./Componentz/CreateEvent";
import TestTest from "./Componentz/Test";
import { Routes, Route } from "react-router-dom";
import Registration from "./Componentz/Registration";
import SearchEvents from "./Componentz/SearchEvents";
import OrganizationList from "./Componentz/OrganizationList";

function App() {
  const [token, setToken] = useLocalStorageState("userToken", "");
  const [username, setUsername] = useLocalStorageState("userName", "");
  const [userID, setUserID] = useLocalStorageState("userID", "");
  const baseURL = "https://safe-connected.onrender.com/";

  const setUser = (token, username) => {
    setToken(token);
    setUsername(username);
  };

  const setUserPK = (userID) => {
    setUserID(userID);
  };

  console.log(token);
  console.log(username);
  console.log(userID);

  return (
    <>
      <Flex direction="column" minHeight="100vh">
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
                  path="/search-events"
                  element={<SearchEvents username={username} token={token} />}
                />
                <Route
                  path="/create-event"
                  element={<CreateEvent username={username} token={token} />}
                />
                <Route path="/test" element={<TestTest token={token} />} />
                <Route
                  path="/organizations"
                  element={<OrganizationList token={token} />}
                />
              </Routes>
            </>
          ) : (
            <>
              <Center flex="1">
                <Routes>
                  <Route path="/login" element={<Login setUser={setUser} />} />
                  <Route
                    path="/"
                    element={<Registration setUserPK={setUserPK} />}
                  />
                </Routes>
              </Center>
            </>
          )}
        </Flex>
        <Footer />
      </Flex>
    </>
  );
}

export default App;

{
  /* <>
<Registration setUserPK={setUserPK} />
<Routes>
  <Route path="/login" element={<Login setUser={setUser} />} />
</Routes>
</> */
}
