import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Center,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";

import Login from "./login";

const LandingPage = () => {
  const handleLoginPage = () => {
    console.log("hi");
    return <Login />;
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("blackAlpha.800")}
      >
        <Center h="100vh">
          <Container maxW={"3xl"}>
            <Stack
              as={Box}
              textAlign={"center"}
              spacing={{ base: 8, md: 14 }}
              py={{ base: 20, md: 36 }}
            >
              <Heading
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
                color={"yellow.200"}
              >
                Safe. Connected. <br />
                <Text as={"span"} color={"yellow.200"}>
                  Resources & Services.
                </Text>
              </Heading>
              <Stack
                direction={"column"}
                spacing={3}
                align={"center"}
                alignSelf={"center"}
                position={"relative"}
              >
                <Button
                  onClick={handleLoginPage}
                  color={"blackAlpha.800"}
                  bg={"yellow.200"}
                  rounded={"full"}
                  px={6}
                  _hover={{
                    bg: "yellow.500",
                  }}
                >
                  LOGIN
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Center>
      </Flex>
    </>
  );
};

export default LandingPage;
