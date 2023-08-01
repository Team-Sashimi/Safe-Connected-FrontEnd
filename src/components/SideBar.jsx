import { IconButton, Flex, Avatar, Text, Heading } from "@chakra-ui/react"; // Add Avatar, Text, and Heading imports
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiBriefcase,
  FiSettings,
  FiPlus,
} from "react-icons/fi";
import { IoPawOutline } from "react-icons/io5";
import React, { useState } from "react";
import { Divider } from "@chakra-ui/react"; // Add the missing import for Divider
import NavItem from "./NavItem"; // Assuming this is the correct path for NavItem

import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import UploadFile from "./UploadFile";

const SideBar = ({ username, token, userRole }) => {
  const baseURL = "https://safe-connected.onrender.com/";

  const [navSize, changeNavSize] = useState("small");

  return (
    <Flex
      pos="sticky"
      bgColor="grey.200"
      left="2"
      h="80vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize === "small" ? "15px" : "30px"} // Use === instead of ==
      w={navSize === "small" ? "55px" : "200px"} // Use === instead of ==
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"} // Use === instead of ==
        as="nav"
      >
        <IconButton
          background="none"
          color="yellow.200"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === "small")
              changeNavSize("large"); // Use === instead of ==
            else changeNavSize("small"); // Use === instead of ==
          }}
        />
        <Link to="/">
          <NavItem
            navSize={navSize}
            icon={FiHome}
            title="Home"
            color="yellow.200"
            description="This is the description for the dashboard."
          />
        </Link>
        {userRole === "Manager" && (
          <Link to="/create">
            <NavItem navSize={navSize} icon={FiPlus} title="Create" />
          </Link>
        )}
        <Link to="/search-events">
          <NavItem navSize={navSize} icon={FiCalendar} title="Events" />
        </Link>

        <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
      </Flex>
    </Flex>
  );
};

export default SideBar;
