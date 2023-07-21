import { useState } from "react";
import axios from "axios";
import { Flex, Center } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { Main } from "./Components/Main";
import { Navbar } from "./Components/Navbar";
import Login from "./Components/Login";
import ClientList from "./Components/ClientList";
import ClientRegistration from "./Components/ClientRegistration";
import EventDetails from "./Components/EventDetails";
import Create from "./Components/Create";

import SearchEvents from "./Components/SearchEvents";

function App() {
  const [token, setToken] = useLocalStorageState("userToken", "");
  const [username, setUsername] = useLocalStorageState("userName", "");
  const [role, setRole] = useLocalStorageState("userName", "");
  const baseURL = "https://safe-connected.onrender.com/";

  const setUser = (token, username) => {
    setToken(token);
    setUsername(username);
  };

  const setUserRole = (role) => {
    setRole(role);
  };

  console.log(token);
  console.log(username);

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
                  path="/clients"
                  element={<ClientList username={username} token={token} />}
                />
                <Route
                  path="/register-client"
                  element={
                    <ClientRegistration username={username} token={token} />
                  }
                />
                <Route
                  path="/event/:eventID"
                  element={<EventDetails username={username} token={token} />}
                />
                <Route
                  path="/create/"
                  element={<Create username={username} token={token} />}
                />
              </Routes>
            </>
          ) : (
            <>
              <Center flex="1">
                <Routes>
                  <Route path="/" element={<Login setUser={setUser} />} />
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

{
  /* <Route
path="/organizations/:orgID"
element={
  <OrganizationProfile token={token} username={username} />
}
/> */
}
