import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Center, InputGroup, Avatar } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";

const UploadFile = ({ token, username }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const fileInputRef = useRef(null);
  const [fileUpload, setFileUpload] = useState(null);

  const handleFileInputChange = () => {
    const file = fileInputRef.current.files[0];
    axios
      .post(
        `${baseURL}uploads/`,
        { file: file },
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

    console.log(file);
  };

  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Center>
        <Avatar
          size="xl"
          name={username}
          mb="10"
          // src="https://example.com/avatar.jpg"
        />
        <InputGroup>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <AddIcon
            color="gray.300"
            cursor="pointer"
            onClick={handleAddIconClick}
          />
        </InputGroup>
      </Center>
    </>
  );
};

export default UploadFile;
