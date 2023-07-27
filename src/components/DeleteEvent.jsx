import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Center,
  Text,
  Button,
  Tooltip,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const DeleteEvent = ({ token }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [event, setEvent] = useState([]);
  const { eventID } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleDelete = () => {
    onOpen(); // Open the AlertDialog when the Delete button is clicked
  };

  const handleConfirmation = () => {
    axios
      .delete(`${baseURL}event/${eventID}/details/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setIsButtonClicked(true);
        setEvent(res.data);
        navigate("/search-events");
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <>
      <>
        <Button colorScheme="red" m="3" onClick={handleDelete}>
          Delete
        </Button>
        <AlertDialog isOpen={isOpen} onClose={onClose}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Confirmation</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this event?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={handleConfirmation}>
                Yes
              </Button>
              <Button ml={3} onClick={onClose}>
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </>
  );
};

export default DeleteEvent;
