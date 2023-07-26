import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading, Center, Text, Button, Tooltip } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const ClientSignUp = ({ token, eventID }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const navigate = useNavigate();

  //   useEffect(() => {
  //   axios
  //     .get(`${baseURL}event/list/`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setEvents(res.data);
  //     });
  // }, [token]);

  const handleSignUp = () => {
    axios
      .patch(
        `${baseURL}event/roster/${eventID}/signup/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("you signed up!");
        setIsButtonClicked(true);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <>
      {isButtonClicked ? (
        <Tooltip label="Thanks for signing up!" isOpen>
          <Button>SIGN UP</Button>
        </Tooltip>
      ) : (
        <Button my="10" onClick={handleSignUp}>
          SIGN UP
        </Button>
      )}
    </>
  );
};

export default ClientSignUp;
