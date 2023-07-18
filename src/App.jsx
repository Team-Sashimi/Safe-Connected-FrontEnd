// import { useState } from "react";
// import { Route } from "react-router-dom";
import Login from "./components/login";
import EventsFeed from "./components/events";
import useLocalStorageState from "use-local-storage-state";

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
    <>
      {token ? (
        <EventsFeed token={token} username={username} />
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
}

export default App;
