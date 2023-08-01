import React from "react";
import {
  Flex,
  Text,
  SimpleGrid,
  Box,
  Container,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Heading,
  Avatar,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import dayjs from "dayjs";

const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, "");

  const countryCode = cleaned.slice(0, 3);
  const areaCode = cleaned.slice(3, 6);
  const localNumber = cleaned.slice(6);

  return `(${countryCode})-${areaCode}-${localNumber}`;
};

const OrgProfile = ({ token, username, userRole, language, orgDetails }) => {
  const formattedPhone = orgDetails.phone
    ? formatPhoneNumber(orgDetails.phone)
    : "";

  return (
    <>
      <SimpleGrid
        h="100vh"
        bgGradient="linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%)"
        rows={2}
        spacing={4}
        // maxChildHeight="100px"
      >
        <Box
          // backgroundColor="gray.200"
          borderRadius="20px"
          overflow="auto"
          p="4"
          mt="25vh"
        >
          <Center>
            <Avatar
              size="xl"
              name={username}
              mb="5"
              src={orgDetails.org_avatar}
            />
          </Center>
          <Center>
            <Flex direction="column" align="center">
              <Heading mt="4" size="xl" color="yellow.200">
                {orgDetails.org_name}
              </Heading>
              <Heading mt="4" size="lg" color="whiteAlpha.600">
                {formattedPhone}
              </Heading>
              <Heading mt="1" size="sm" color="whiteAlpha.600">
                {orgDetails.email}
              </Heading>
              <Text fontSize="14px" color="whiteAlpha.600">
                {orgDetails.street_number} {orgDetails.street_name}
              </Text>
              <Text fontSize="14px" color="whiteAlpha.600">
                {orgDetails.city}, {orgDetails.state} {orgDetails.zipcode}
              </Text>

              {userRole === "Manager" && (
                <Link to="/edit-account">
                  <Button size="xs" backgroundColor="yellow.200" m="4">
                    Edit Info
                  </Button>
                </Link>
              )}
            </Flex>
          </Center>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default OrgProfile;
