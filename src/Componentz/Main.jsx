import { Container, Flex, Heading, Box } from "@chakra-ui/react";

export const Main = ({ username, token }) => {
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="6">
      <Container maxW="900px" bgColor="yellow.200" flex="1">
        <Box bgColor="blue.200">
          <Heading>Hello {username} </Heading>
        </Box>
      </Container>
    </Flex>
  );
};
