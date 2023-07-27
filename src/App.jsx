import { useState, useEffect } from "react";

import axios from "axios";
import { Flex, Center, Button } from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import { Routes, Route, Link } from "react-router-dom";
// import { Footer } from "./Components/Footer";
import { Main } from "./components/Main";
import { Navbar } from "./components/navbar";
import ClientList from "./components/ClientList";
import ClientRegistration from "./components/ClientRegistration";
import ClientProfile from "./components/ClientProfile";

import EventDetails from "./components/EventDetails";
import Create from "./components/Create";

import SearchEvents from "./components/SearchEvents";
import UserProfile from "./components/UserProfile";
import LoginRole from "./components/LoginRole";
import EditUserProfile from "./components/EditUserProfile";
import UploadFile from "./components/UploadFile";
import DeleteEvent from "./components/DeleteEvent";
import EditEventDetails from "./components/EditEventDetails";
import ManagerEvents from "./components/ManagerEvents";

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
      <Flex direction="column" minHeight="100vh">
        <Navbar handleLogout={handleLogout} />
        <Flex direction="column" flex="1">
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
                    />
                  }
                />
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
                  path="/clients/:userID"
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
                  path="/register-client"
                  element={
                    <ClientRegistration
                      username={username}
                      token={token}
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
                  path="/account"
                  element={
                    <UserProfile
                      username={username}
                      token={token}
                      userRole={userRole}
                      orgDetails={orgDetails}
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
                  path="/upload-image"
                  element={
                    <UploadFile
                      username={username}
                      token={token}
                      userRole={userRole}
                    />
                  }
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

{
  /* {userRole === "Manager" && (
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
                )} */
}
