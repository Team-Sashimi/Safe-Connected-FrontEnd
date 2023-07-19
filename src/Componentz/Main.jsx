import {
  Container,
  Flex,
  Heading,
  Box,
  Center,
  Text,
  Input,
} from "@chakra-ui/react";

export const Main = ({ username, token }) => {
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="6">
      <Container maxW="900px" flex="1">
        <Box>
          <Center>
            <Flex direction="column" align="center">
              <Heading color="yellow.200">UPCOMING EVENTS</Heading>
              <Text color="yellow.200">{username}</Text>
              <Input
                my="8"
                variant="filled"
                placeholder="Search Event"
                size="md"
              />
            </Flex>
          </Center>
        </Box>
      </Container>
    </Flex>
  );
};
