import { Box, Container, Heading, Flex, Link, Button } from "@chakra-ui/react";
import cnctr_nav from "../assets/cnctr_nav.svg";

export const Navbar = ({ handleLogout }) => {
  return (
    <Box bgColor="yellow.200" as="nav" role="navigation" bg="bg.accent.default">
      <Container maxW="100vh">
        <Flex
          pt="2"
          justifyContent="space-between"
          alignItems="center"
          minH="8vh"
        >
          <Link href="/">
            <img src={cnctr_nav} alt="Logo" width="100px" height="40px" />
          </Link>

          <Link to="/">
            <Button onClick={handleLogout}>Log Out</Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

{
  /* <Link fontWeight="bold" href="/">
Safe n Connected
</Link>

<Link href="/">
<cnctr width="150px" height="40px" alt="Logo" />
</Link> */
}
