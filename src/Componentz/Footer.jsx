import { Box, Container, Flex, LinkBox } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Box
      bgColor="yellow.200"
      as="footer"
      role="contentinfo"
      bg="bg.accent.default"
    >
      <Container maxW="80vh">
        <Flex justifyContent="space-between" alignItems="center" minH="20">
          <Link>Events</Link>
          <Link>Clients</Link>
          <Link to="/test">Account</Link>
        </Flex>
      </Container>
    </Box>
  );
};
