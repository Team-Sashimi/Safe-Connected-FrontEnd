import {
  Container,
  Flex,
  Heading,
  Box,
  Center,
  Text,
  Input,
  Button,
  Grid,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

export const Main = ({ username, token }) => {
  return (
    <Flex as="main" role="main" direction="column" flex="2" py="6">
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
        <Grid templateColumns="1fr 1fr" gap={4}>
          <Box>
            <Center>
              <Link to="/create-event">
                <Button>CREATE AN EVENT</Button>
              </Link>
            </Center>
          </Box>
          <Center>
            <Flex direction="column">
              <Heading>Event Title</Heading>
              <Box>
                <Text>Event Details</Text>
                <Text>Date</Text>
              </Box>
            </Flex>
          </Center>
        </Grid>
      </Container>
    </Flex>
  );
};
