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
  useToast,
} from "@chakra-ui/react";
import useLocalStorageState from "use-local-storage-state";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ClientSignUp = ({ token, eventID }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [isButtonClicked, setIsButtonClicked] = useState(
    () => localStorage.getItem("isButtonClicked") === "true"
  );
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isButtonClicked", isButtonClicked);
  }, [isButtonClicked]);

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
        setIsAlertOpen(true);
        showToast();
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleCancel = () => {
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
        console.log("you canceled your sign-up!");
        setIsButtonClicked(false);
        setIsAlertOpen(false);
        showToastCancel();
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const showToast = () => {
    toast({
      title: "Thanks for signing up!",
      description: "You will be getting an email soon.",
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
      onClose: () => window.location.reload(),
    });
  };

  const showToastCancel = () => {
    toast({
      title: "Sorry you had to cancel!",
      description: "You will be getting an email soon.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        my="2"
        onClick={isButtonClicked ? handleCancel : handleSignUp}
        colorScheme={isButtonClicked ? "red" : "green"}
      >
        {isButtonClicked ? "Cancel" : "Sign Up"}
      </Button>
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
//   useToast,
// } from "@chakra-ui/react";
// import useLocalStorageState from "use-local-storage-state";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const ClientSignUp = ({ token, eventID }) => {
//   const baseURL = "https://safe-connected.onrender.com/";
//   const [isButtonClicked, setIsButtonClicked] = useState(
//     () => localStorage.getItem("isButtonClicked") === "true"
//   );
//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const toast = useToast();

//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.setItem("isButtonClicked", isButtonClicked);
//   }, [isButtonClicked]);

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
//         setIsButtonClicked(true); // Set the button click state to true after successful sign-up
//         setIsAlertOpen(true); // Show the alert after successful sign-up
//         showToast();
//       })
//       .catch((error) => {
//         console.log("error");
//       });
//   };

//   const handleCancel = () => {
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
//         console.log("you canceled your sign-up!");
//         setIsButtonClicked(false); // Set the button click state to false after successful cancellation
//         setIsAlertOpen(false); // Hide the alert after successful cancellation
//         showToastCancel();
//       })
//       .catch((error) => {
//         console.log("error");
//       });
//   };

//   const showToast = () => {
//     toast({
//       title: "Thanks for signing up!",
//       description: "You will be getting an email soon.",
//       status: "success",
//       duration: 3000, // Duration in milliseconds (3 seconds in this example)
//       isClosable: true,
//     });
//   };

//   return (
//     <>
//       <Button my="2" onClick={isButtonClicked ? handleCancel : handleSignUp}>
//         {isButtonClicked ? "Cancel" : "Sign Up"}
//       </Button>
//     </>
//   );
// };

// export default ClientSignUp;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
//
//
//
//
//
// basic workking not holding storage
// const ClientSignUp = ({ token, eventID }) => {
//   const baseURL = "https://safe-connected.onrender.com/";
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const [isAlertOpen, setIsAlertOpen] = useState(false); // State to manage the visibility of the alert dialog

//   const navigate = useNavigate();

//   const toast = useToast();

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
//         setIsButtonClicked(true); // Set the button click state to true after successful sign-up
//         setIsAlertOpen(true); // Show the alert after successful sign-up
//         showToast();
//       })
//       .catch((error) => {
//         console.log("error");
//       });
//   };

//   const showToast = () => {
//     toast({
//       title: "Thanks for signing up!",
//       description: "You will be getting an email soon.",
//       status: "success",
//       duration: 3000, // Duration in milliseconds (3 seconds in this example)
//       isClosable: true,
//     });
//   };

//   return (
//     <>
//       <Button my="2" onClick={handleSignUp}>
//         {isButtonClicked ? "Cancel" : "Sign Up"}
//       </Button>
//     </>
//   );
// };

// export default ClientSignUp;
