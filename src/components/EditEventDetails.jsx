import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading, Center, Text, Button, Tooltip } from "@chakra-ui/react";

import { Link } from "react-router-dom";

//patch on create event component

const EditEventDetails = ({ token }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [event, setEvent] = useState([]);
  const { eventID } = useParams();

  const navigate = useNavigate();

  const handleEditEvent = () => {
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
        console.log("You are about to edit the event.");
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
        <Tooltip label="Edit" isOpen>
          <Button>Edit</Button>
        </Tooltip>
      ) : (
        <Button onClick={handleEditEvent}>Edit</Button>
      )}
    </>
  );
};

export default EditEventDetails;
