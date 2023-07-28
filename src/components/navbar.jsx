import {
  Box,
  Container,
  Heading,
  Flex,
  Link,
  Button,
  Center,
} from "@chakra-ui/react";
import cnctr_nav from "../assets/cnctr_nav.svg";

export const Navbar = ({ handleLogout }) => {
  return (
    <Box
      bgColor="yellow.200"
      borderRadius="15p"
      as="nav"
      role="navigation"
      bg="bg.accent.default"
    >
      <Container maxW="100vh">
        <Flex pt="2" justifyContent="center" alignItems="center" minH="8vh">
          <Link href="/">
            <img src={cnctr_nav} alt="Logo" width="120px" height="60px" />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};

// export const Navbar = ({ handleLogout }) => {
//   return (
//     <Box bgColor="yellow.200" as="nav" role="navigation" bg="bg.accent.default">
//       <Container maxW="100vh">
//         <Flex
//           pt="2"
//           justifyContent="space-between"
//           alignItems="center"
//           minH="8vh"
//         >
//           <Center>
//             <Link href="/">
//               <img src={cnctr_nav} alt="Logo" width="120px" height="60px" />
//             </Link>
//           </Center>

//           <Link to="/">
//             <Button onClick={handleLogout}>Log Out</Button>
//           </Link>
//         </Flex>
//       </Container>
//     </Box>
//   );
// };
