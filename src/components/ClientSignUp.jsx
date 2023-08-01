import React, { useState, useEffect } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tooltip,
} from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ClientSignUp = ({ token, eventID }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [signUp, setSignUp] = useLocalStorageState("userRole", "");

  const navigate = useNavigate();

  const setLocalStorageSignUp = (value) => {
    localStorage.setItem(`signUpStatus-${eventID}`, JSON.stringify(value));
  };

  // Function to get the local storage value for the current event
  const getLocalStorageSignUp = () => {
    const value = localStorage.getItem(`signUpStatus-${eventID}`);
    return value ? JSON.parse(value) : false;
  };

  useEffect(() => {
    // Check the local storage to see if the user has signed up for this event
    const hasSignedUp = getLocalStorageSignUp();
    if (hasSignedUp) {
      setIsButtonClicked(true);
    }
  }, [eventID]);

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
        setLocalStorageSignUp(true); // Set the sign-up status in local storage
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <>
      {isButtonClicked ? (
        <Button my="2" colorScheme="red">
          Cancel
        </Button>
      ) : (
        <Button my="2" onClick={handleSignUp}>
          Sign Up
        </Button>
      )}
    </>
  );
};

export default ClientSignUp;
