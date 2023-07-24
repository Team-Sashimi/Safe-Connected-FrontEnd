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
  Input,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

const UploadFile = ({ token, eventID }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const [fileUpload, setFileUpload] = useState("");

  const navigate = useNavigate();

  //   useEffect(() => {
  //   axios
  //     .get(`${baseURL}event/list/`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setEvents(res.data);
  //     });
  // }, [token]);

  const handleUploadFile = () => {
    axios
      .post(
        `${baseURL}uploads/`,
        { file: fileUpload },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("you uploaded an file!");
        setFileUpload("");
        // navigate("/");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  return (
    <>
      <Input
        type="file"
        id="avatar"
        name="avatar"
        // accept="image/png, image/jpeg"
      ></Input>
      <Button type="submit" my="10" onClick={handleUploadFile}>
        Upload Image
      </Button>
    </>
  );
};

export default UploadFile;
