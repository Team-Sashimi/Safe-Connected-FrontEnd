import { useState, useEffect } from "react";

import axios from "axios";
import { Flex, Center, Button } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import { Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main";
import { Navbar } from "./components/navbar";
import ClientList from "./components/ClientList";
import Create from "./components/Create";

import SearchEvents from "./components/SearchEvents";
import LoginRole from "./components/LoginRole";
import SideBar from "./components/SideBar";
import BottomBar from "./components/BottomBar";

import ManagerEvents from "./components/ManagerEvents";
import EditEventDetails from "./components/EditEventDetails";
import EventDetails from "./components/EventDetails";

import UserProfile from "./components/UserProfile";
import EditUserProfile from "./components/EditUserProfile";
import ClientProfile from "./components/ClientProfile";
import ClientRegistration from "./components/ClientRegistration";

import { Container } from "@chakra-ui/react";

function App() {
  const [token, setToken] = useLocalStorageState("userToken", "");
  const [username, setUsername] = useLocalStorageState("userName", "");
  const [userRole, setUserRole] = useLocalStorageState("userRole", "");
  const [language, setLanguage] = useLocalStorageState("userLanguage", "");
  const [orgDetails, setOrgDetails] = useState([]);
  const baseURL = "https://safe-connected.onrender.com/";

  const setUser = (token, username, userRole, language) => {
    setToken(token);
    setUsername(username);
    setUserRole(userRole);
    setLanguage(language);
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

  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}organization/1/`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setOrgDetails(res.data);
  //     });
  // }, [token]);

  console.log(language);

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <BottomBar userRole={userRole} />
      {/* <Flex bgColor="gray.800" h="92vh">
        <SideBar userRole={userRole} />
        <Flex flex="1" flexDirection="column" h="92vh"> */}
      {/* <Center
        h="100vh"
        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
        alignItems="flex-start"
      > */}

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
                  language={language}
                  handleLogout={handleLogout}
                />
              }
            />
            <Route
              path="/create/"
              element={
                <Create username={username} token={token} userRole={userRole} />
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
                  language={language}
                />
              }
            />
            <Route
              path="/members"
              element={
                <ClientList
                  username={username}
                  token={token}
                  orgDetails={orgDetails}
                />
              }
            />
            <Route
              path="/member/:memberID"
              element={
                <ClientProfile
                  username={username}
                  token={token}
                  userRole={userRole}
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
                  language={language}
                />
              }
            />
            <Route
              path="/account"
              element={
                <UserProfile
                  username={username}
                  token={token}
                  userRole={userRole}
                  orgDetails={orgDetails}
                  language={language}
                />
              }
            />
            <Route
              path="/edit-account"
              element={
                <EditUserProfile
                  username={username}
                  token={token}
                  userRole={userRole}
                  language={language}
                />
              }
            />
            <Route
              path="/register-client"
              element={
                <ClientRegistration
                  username={username}
                  token={token}
                  userRole={userRole}
                  language={language}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <>
          <Flex bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)">
            <Routes>
              <Route path="/" element={<LoginRole setUser={setUser} />} />
            </Routes>
          </Flex>
        </>
      )}
      {/* </Center> */}
      {/* </Flex>
      </Flex> */}
    </>
  );
}

export default App;
