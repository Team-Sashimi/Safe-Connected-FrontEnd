import { useState, useEffect } from "react";

import axios from "axios";
import { Flex, Center, Button } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import { Routes, Route, Link } from "react-router-dom";
import { Main } from "./components/Main";
import { Navbar } from "./components/navbar";
import ClientList from "./components/ClientList";
import Create from "./components/Create";

import SearchEvents from "./components/SearchEvents";
import LoginRole from "./components/LoginRole";
import SideBar from "./components/SideBar";

import ManagerEvents from "./components/ManagerEvents";
import EditEventDetails from "./components/EditEventDetails";
import EventDetails from "./components/EventDetails";

function App() {
  const [token, setToken] = useLocalStorageState("userToken", "");
  const [username, setUsername] = useLocalStorageState("userName", "");
  const [userRole, setUserRole] = useLocalStorageState("userRole", "");
  const [orgDetails, setOrgDetails] = useState([]);
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

  useEffect(() => {
    axios
      .get(`${baseURL}organization/1/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setOrgDetails(res.data);
      });
  }, [token]);

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <Flex bgColor="gray.800" h="92vh">
        <SideBar userRole={userRole} />
        <Flex flex="1" flexDirection="column">
          {token ? (
            <>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      username={username}
                      token={token}
                      userRole={userRole}
                      handleLogout={handleLogout}
                    />
                  }
                />
                <Route
                  path="/create/"
                  element={
                    <Create
                      username={username}
                      token={token}
                      userRole={userRole}
                    />
                  }
                />
                <Route
                  path="/search-events"
                  element={
                    <SearchEvents
                      username={username}
                      token={token}
                      userRole={userRole}
                      orgDetails={orgDetails}
                    />
                  }
                />
                <Route
                  path="/clients"
                  element={
                    <ClientList
                      username={username}
                      token={token}
                      orgDetails={orgDetails}
                    />
                  }
                />
                <Route
                  path="/your-events"
                  element={
                    <ManagerEvents
                      username={username}
                      token={token}
                      userRole={userRole}
                      orgDetails={orgDetails}
                    />
                  }
                />
                <Route
                  path="/edit-event/:eventID"
                  element={
                    <EditEventDetails
                      username={username}
                      token={token}
                      userRole={userRole}
                      orgDetails={orgDetails}
                    />
                  }
                />
                <Route
                  path="/event/:eventID"
                  element={
                    <EventDetails
                      username={username}
                      token={token}
                      userRole={userRole}
                      orgDetails={orgDetails}
                    />
                  }
                />
              </Routes>
            </>
          ) : (
            <>
              <Center flex="1">
                <Routes>
                  <Route path="/" element={<LoginRole setUser={setUser} />} />
                </Routes>
              </Center>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export default App;
