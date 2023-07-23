import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading, Center, Text, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const ClientSignUp = ({ token, eventID }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const navigate = useNavigate();

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
        navigate("/");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <>
      <Button onClick={handleSignUp}>SIGN UP</Button>
    </>
  );
};

export default ClientSignUp;
