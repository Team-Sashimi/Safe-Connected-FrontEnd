import { useState } from "react";
import axios from "axios";
import { Flex, Center, Button } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import { Routes, Route, Link } from "react-router-dom";
// import { Footer } from "./Components/Footer";
import { Main } from "./Components/Main";
import { ClientMain } from "./Components/ClientMain";
import { Navbar } from "./Components/Navbar";
import Login from "./Components/login";
import ClientList from "./Components/ClientList";
import ClientRegistration from "./Components/ClientRegistration";
import EventDetails from "./Components/EventDetails";
import Create from "./Components/Create";

import SearchEvents from "./Components/SearchEvents";
import UserProfile from "./Components/UserProfile";
import LoginRole from "./Components/LoginRole";

function App() {
  const [token, setToken] = useLocalStorageState("userToken", "");
  const [username, setUsername] = useLocalStorageState("userName", "");
  const [userRole, setUserRole] = useLocalStorageState("userRole", "");
  const baseURL = "https://safe-connected.onrender.com/";

  const setUser = (token, username, userRole) => {
    setToken(token);
    setUsername(username);
    setUserRole(userRole);
  };

  const handleLogout = () => {
    axios
      .post(
        `${baseURL}auth/token/logout/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then(() => {
        setUser("", null);
        // navigate("/");
      });
  };

  return (
    <>
      <Flex direction="column" minHeight="100vh">
        <Navbar handleLogout={handleLogout} />
        {/* <Link to="/">
          <Button onClick={handleLogout}>Log Out</Button>
        </Link> */}
        <Flex direction="column" flex="1">
          {token ? (
            <>
              <Routes>
                {userRole === "Manager" && (
                  <Route
                    path="/"
                    element={
                      <Main
                        username={username}
                        token={token}
                        userRole={userRole}
                      />
                    }
                  />
                )}
                {userRole === "Client" && (
                  <Route
                    path="/"
                    element={
                      <ClientMain
                        username={username}
                        token={token}
                        userRole={userRole}
                      />
                    }
                  />
                )}

                <Route
                  path="/create/"
                  element={<Create username={username} token={token} />}
                />
                <Route
                  path="/search-events"
                  element={
                    <SearchEvents
                      username={username}
                      token={token}
                      userRole={userRole}
                    />
                  }
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
                  path="/account"
                  element={<UserProfile username={username} token={token} />}
                />
              </Routes>
            </>
          ) : (
            <>
              <Center flex="1">
                <Routes>
                  {/* <Route path="/" element={<Login setUser={setUser} />} /> */}
                  <Route path="/" element={<LoginRole setUser={setUser} />} />
                </Routes>
              </Center>
            </>
          )}
        </Flex>
        {/* <Footer /> */}
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
