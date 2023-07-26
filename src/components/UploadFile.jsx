import React, { useRef, useState } from "react";
import axios from "axios";
import { Center, InputGroup, Avatar, Input } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import useLocalStorageState from "use-local-storage-state";

import { Link } from "react-router-dom";

const UploadFile = ({ token, username }) => {
  const baseURL = "https://safe-connected.onrender.com/";
  const fileInputRef = useRef(null);
  const [fileUpload, setFileUpload] = useLocalStorageState("userAvatar", "");

  const handleFileInputChange = () => {
    const file = fileInputRef.current.files[0];
    console.log(file);

    // Create a FormData object and append the file to it
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${baseURL}uploads/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log("you uploaded a file!");
        console.log(res.data);
        const uploadedFileUrl = res.data.file;
        setFileUpload(uploadedFileUrl);
        // navigate("/");
      })
      .catch((error) => {
        console.log("error");
      });
  };

  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };

  console.log(fileUpload);
  return (
    <>
      <Center>
        <Avatar size="xl" name={username} mb="10" src={fileUpload} />
        <InputGroup>
          <Input
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

// import React, { useRef, useState } from "react";
// import axios from "axios";
// import { Center, InputGroup, Avatar, Input } from "@chakra-ui/react";
// import { AddIcon } from "@chakra-ui/icons";
// import useLocalStorageState from "use-local-storage-state";

// import { Link } from "react-router-dom";

// const UploadFile = ({ token, username }) => {
//   const baseURL = "https://safe-connected.onrender.com/";
//   const fileInputRef = useRef(null);
//   const [fileUpload, setFileUpload] = useLocalStorageState("userAvatar", "");

//   const handleFileInputChange = () => {
//     const file = fileInputRef.current.files[0];
//     console.log(file);

//     // Create a FormData object and append the file to it
//     const formData = new FormData();
//     formData.append("file", file);

//     axios
//       .post(`${baseURL}uploads/`, formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log("you uploaded a file!");
//         console.log(res.data);
//         const uploadedFileUrl = res.data.file;
//         setFileUpload(uploadedFileUrl);
//         // navigate("/");
//       })
//       .catch((error) => {
//         console.log("error");
//       });
//   };

//   const handleAddIconClick = () => {
//     fileInputRef.current.click();
//   };

//   console.log(fileUpload);
//   return (
//     <>
//       <Center>
//         <Avatar size="xl" name={username} mb="10" src={fileUpload} />
//         <InputGroup>
//           <Input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleFileInputChange}
//           />
//           <AddIcon
//             color="gray.300"
//             cursor="pointer"
//             onClick={handleAddIconClick}
//           />
//         </InputGroup>
//       </Center>
//     </>
//   );
// };

// export default UploadFile;
