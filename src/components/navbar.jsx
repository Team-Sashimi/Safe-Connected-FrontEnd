import { Box, Container, Heading, Flex, Link } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <Box bgColor="yellow.200" as="nav" role="navigation" bg="bg.accent.default">
      <Container maxW="100vh">
        <Flex justifyContent="space-between" alignItems="center" minH="20">
          <Link fontWeight="bold" href="/">
            Safe n Connected
          </Link>
          <Link>Choose Language</Link>
        </Flex>
      </Container>
    </Box>
  );
};
