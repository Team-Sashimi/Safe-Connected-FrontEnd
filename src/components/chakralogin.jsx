import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("blackAlpha.800")}
    >
      <Stack w={"xl"} spacing={8} py={12} px={6}>
        <Stack justifyContent={"center"} align={"left-align"}>
          <Heading color={"yellow.200"} fontSize={"4xl"}>
            SIGN IN TO YOUR ACCOUNT
          </Heading>
          <Text as={"span"} color={"yellow.200"}>
            For Full Access to Your Resources & Services.
          </Text>
        </Stack>
        <Box w={"xl"} rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel color={"yellow.200"}>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel color={"yellow.200"}>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox color={"yellow.200"}>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"yellow.200"}
                color={"blackAlpha.800"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
