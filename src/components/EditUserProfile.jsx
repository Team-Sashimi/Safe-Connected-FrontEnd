import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Button,
  Center,
} from "@chakra-ui/react";
import UploadFile from "./UploadFile";

const EditUserProfile = ({ token, username, userRole }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userLanguage, setUserLanguage] = useState("");
  const navigate = useNavigate();

  const handleEditAccount = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${baseURL}auth/users/me/`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          language: userLanguage,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("you edited your profile");
        setFirstName("");
        setLastName("");
        setUserLanguage("");
        navigate("/account");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <>
      <Container h="30vh" w="75%" mt="13vh">
        <Flex
          direction="column"
          w="100%"
          h="100%"
          borderRadius="15"
          border="solid"
          // borderColor="yellow.200"
        >
          <UploadFile token={token} username={username} />
        </Flex>
        <SimpleGrid columns={1} spacing={4}>
          <FormControl>
            <FormLabel color="yellow.200" fontSize="10px" mb="1">
              Event Title
            </FormLabel>
            <Input
              placeholder="Name of Event"
              type="text"
              size="xs"
              color="whiteAlpha.800"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Event Date
            </FormLabel>
            <Input
              placeholder="Pick a date"
              type="date"
              mt="-20px"
              size="xs"
              variant="filled"
              color="blackAlpha.800"
              onChange={(e) => setLastName(e.target.value)}
            />

            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Choose Language{" "}
            </FormLabel>
            <Select
              placeholder="Choose below"
              size="xs"
              variant="filled"
              color="blackAlpha.800"
              onChange={(e) => setLastName(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </Select>
            <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
              Email
            </FormLabel>
            <Input
              placeholder="Enter email..."
              size="xs"
              variant="filled"
              color="blackAlpha.800"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
        </SimpleGrid>
        <FormControl>
          <Center>
            <Button
              mt="4"
              size="xs"
              type="submit"
              colorScheme="green"
              onClick={handleEditAccount}
              cursor="pointer"
            >
              Update Profile
            </Button>
          </Center>
        </FormControl>
      </Container>
    </>
  );
};

export default EditUserProfile;

// <form onSubmit={handleEditAccount}>
//   <FormControl>
//     <div>
//       <FormLabel mt="10" color="yellow.200" htmlFor="name">
//         First Name
//       </FormLabel>
//       <Input
//         type="text"
//         name="name"
//         id="name"
//         value={firstName}
//         color="whiteAlpha.600"
//         // as the value in input changes, it's setting the value to setUserName
//         onChange={(e) => setFirstName(e.target.value)}
//         required
//       />
//     </div>
//     <div>
//       <FormLabel mt="4" color="yellow.200" htmlFor="password">
//         Last Name
//       </FormLabel>
//       <Input
//         type="text"
//         name="last-name"
//         id="last-name"
//         color="whiteAlpha.600"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//         required
//       />
//       <FormLabel mt="4" color="yellow.200" htmlFor="password">
//         Email
//       </FormLabel>
//       <Input
//         type="text"
//         name="email"
//         id="email"
//         color="whiteAlpha.600"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <FormLabel mt="4" color="yellow.200" htmlFor="password">
//         Preferred Language
//       </FormLabel>
//       <Select
//         color="whiteAlpha.600"
//         placeholder="Languages"
//         onChange={(e) => setUserLanguage(e.target.value)}
//       >
//         <option value="en">English</option>
//         <option value="es">Spanish</option>
//         <option value="fr">French</option>
//       </Select>
//     </div>
//     <div>
//       <Button mt="20" type="submit" value="Update Profile">
//         Update
//       </Button>
//     </div>
//   </FormControl>
// </form>;
