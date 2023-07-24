import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading, Center, Text, Button, Tooltip } from "@chakra-ui/react";

import { Link } from "react-router-dom";

const DeleteEvent = ({ token, eventID }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const navigate = useNavigate();

  const handleDelete = () => {
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
        // navigate("/");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <>
      {isButtonClicked ? (
        <Tooltip label="Thanks for signing up!" isOpen>
          <Button>Delete</Button>
        </Tooltip>
      ) : (
        <Button m="3" onClick={handleDelete}>
          Delete
        </Button>
      )}
    </>
  );
};

export default DeleteEvent;
