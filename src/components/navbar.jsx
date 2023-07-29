import {
  Box,
  Container,
  Heading,
  Flex,
  Link,
  Button,
  Center,
  Icon,
} from "@chakra-ui/react";
import { FiHome, FiLogOut, FiUser, FiPlus, FiCalendar } from "react-icons/fi";

import cnctr_yellow from "../assets/cnctr_yellow.svg";

export const Navbar = ({ handleLogout }) => {
  return (
    <Box
      as="navvy"
      position="fixed"
      top="4"
      left="6%"
      right="6%"
      height="5%"
      // background="gray.200"
      borderRadius="xl"
      p="1"
      mt="4"
    >
      <Flex justify="space-between" align="center" h="100%">
        <Link href="/">
          <img src={cnctr_yellow} alt="Logo" width="90px" height="60px" />
        </Link>
        <Icon
          onClick={handleLogout}
          as={FiLogOut}
          color="yellow.200"
          boxSize="5"
        />
      </Flex>
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
