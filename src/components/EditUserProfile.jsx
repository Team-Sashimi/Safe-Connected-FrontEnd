import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Center,
  Text,
  Button,
  Flex,
  Avatar,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import UploadFile from "./UploadFile";

import { Link } from "react-router-dom";

const EditUserProfile = ({ token, username, userRole }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
        navigate("/account");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  console.log(token);

  return (
    <>
      <Center bgColor="gray.800" h="100vh">
        <Container className="login">
          <UploadFile token={token} username={username} />
          <form onSubmit={handleEditAccount}>
            <FormControl>
              <div>
                <FormLabel mt="10" color="yellow.200" htmlFor="name">
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={firstName}
                  color="whiteAlpha.600"
                  // as the value in input changes, it's setting the value to setUserName
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <FormLabel mt="4" color="yellow.200" htmlFor="password">
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  name="last-name"
                  id="last-name"
                  color="whiteAlpha.600"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <FormLabel mt="4" color="yellow.200" htmlFor="password">
                  Email
                </FormLabel>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  color="whiteAlpha.600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Button
                  mt="20"
                  onClick={handleEditAccount}
                  type="submit"
                  value="Update Profile"
                >
                  Update
                </Button>
              </div>
            </FormControl>
          </form>
        </Container>
      </Center>
    </>
  );
};

export default EditUserProfile;
