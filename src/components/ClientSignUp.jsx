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
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State to manage the visibility of the alert dialog

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
        setLocalStorageSignUp(true);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleCancel = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmCancel = () => {
    setIsAlertOpen(false);
    setIsButtonClicked(false); // Reset the button state
    setLocalStorageSignUp(false); // Reset the local storage value
  };

  const handleCancelCancel = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      {isButtonClicked ? (
        <Button my="2" colorScheme="red" onClick={handleCancel}>
          Cancel
        </Button>
      ) : (
        <Button my="2" onClick={handleSignUp}>
          Sign Up
        </Button>
      )}

      <AlertDialog isOpen={isAlertOpen} onClose={handleCancelCancel}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Sign Up
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to cancel your sign-up for this event?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={handleCancelCancel}>No</Button>
              <Button colorScheme="red" onClick={handleConfirmCancel} ml={3}>
                Yes, cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ClientSignUp;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   AlertDialog,
//   AlertDialogBody,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogContent,
//   AlertDialogOverlay,
//   Tooltip,
// } from "@chakra-ui/react";
// import useLocalStorageState from "use-local-storage-state";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const ClientSignUp = ({ token, eventID }) => {
//   const baseURL = "https://safe-connected.onrender.com/";
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const [signUp, setSignUp] = useLocalStorageState("userRole", "");

//   const navigate = useNavigate();

//   const setLocalStorageSignUp = (value) => {
//     localStorage.setItem(`signUpStatus-${eventID}`, JSON.stringify(value));
//   };

//   // Function to get the local storage value for the current event
//   const getLocalStorageSignUp = () => {
//     const value = localStorage.getItem(`signUpStatus-${eventID}`);
//     return value ? JSON.parse(value) : false;
//   };

//   useEffect(() => {
//     // Check the local storage to see if the user has signed up for this event
//     const hasSignedUp = getLocalStorageSignUp();
//     if (hasSignedUp) {
//       setIsButtonClicked(true);
//     }
//   }, [eventID]);

//   const handleSignUp = () => {
//     axios
//       .patch(
//         `${baseURL}event/roster/${eventID}/signup/`,
//         {},
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("you signed up!");
//         setIsButtonClicked(true);
//         setLocalStorageSignUp(true);
//       })
//       .catch((error) => {
//         console.log("error");
//       });
//   };

//   return (
//     <>
//       {isButtonClicked ? (
//         <Button my="2" colorScheme="red">
//           Cancel
//         </Button>
//       ) : (
//         <Button my="2" onClick={handleSignUp}>
//           Sign Up
//         </Button>
//       )}
//     </>
//   );
// };

// export default ClientSignUp;
