import React, { useState, useRef, useEffect } from "react";
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
  Avatar,
  InputGroup,
  Icon,
  Text,
  Tooltip,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { FiImage } from "react-icons/fi";

const EditUserProfile = ({ token, username, userRole, setUserLanguage }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEditAccount = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(
        `${baseURL}auth/users/me/`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          language: language,
          // user_avatar: avatar,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("you edited your profile");
        setUserLanguage(language);
        setFirstName("");
        setLastName("");
        setLanguage("");
        setEmail("");
        setAvatar("");
        navigate("/account");
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleAvatar = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .patch(
        `${baseURL}auth/users/me/`,
        {
          user_avatar: avatar,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log("you edited your profile");
        setUserLanguage(language);
        setFirstName("");
        setLastName("");
        setLanguage("");
        setEmail("");
        setAvatar("");
        navigate("/account");
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleUploadComplete = () => {
    setShowTooltip(true);

    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}auth/users/me`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setLanguage(res.data.language);
        setEmail(res.data.email);
        setAvatar(res.data.user_avatar);
        setUserDetails(res.data);
      });
  }, [token]);

  return (
    <>
      <Flex
        h="100vh"
        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #1E2065 56.45%, #020515 86.14%)"
      >
        <Container h="30vh" w="75%" mt="13vh">
          <Flex
            w="100%"
            h="100%"
            borderRadius="15"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Center>
              <Flex direction="">
                {/* Display the Avatar */}
                <Avatar size="xl" name={username} src={avatar} />

                <label>
                  <InputGroup display="none">
                    <Input
                      size="xs"
                      border="none"
                      color="black"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </InputGroup>
                  <Icon
                    color="white"
                    as={FiImage}
                    boxSize="24px"
                    cursor="pointer"
                  />
                </label>
              </Flex>
            </Center>
            <Button
              onClick={handleAvatar}
              cursor="pointer"
              fontSize="10px"
              size="xs"
              mt="2"
              color=""
            >
              {loading ? <Spinner size="sm" /> : "Change Avatar"}
            </Button>
          </Flex>
          <SimpleGrid columns={1} spacing={4}>
            <FormControl>
              <FormLabel color="yellow.200" fontSize="10px" mb="1">
                First Name
              </FormLabel>
              <Input
                placeholder="Enter name..."
                type="text"
                size="xs"
                bg="white"
                color="grey.800"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
                Last Name{" "}
              </FormLabel>
              <Input
                placeholder="Enter last name..."
                type="text"
                mt="-20px"
                size="xs"
                bg="white"
                color="grey.800"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
                Choose Language{" "}
              </FormLabel>
              <Select
                placeholder="Choose below"
                size="xs"
                bg="white"
                color="grey.800"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="sw">Swahili</option>
              </Select>
              <FormLabel color="yellow.200" fontSize="10px" mt="2" mb="1">
                Email
              </FormLabel>
              <Input
                placeholder="Enter email..."
                size="xs"
                bg="white"
                color="grey.800"
                value={email}
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
                disabled={loading}
              >
                {loading ? <Spinner size="sm" /> : "Update Profile"}
              </Button>
            </Center>
          </FormControl>
        </Container>
      </Flex>
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
