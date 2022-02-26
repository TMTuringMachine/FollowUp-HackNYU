import { Box, Flex, Text } from "@chakra-ui/layout";
import SingleText from "./SingleTest";
const RecentTest = () => {
  return (
    <Flex
      m="1rem 4rem"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Text
        fontWeight="800"
        fontSize={{ base: "1rem", md: "3.5rem" }}
        color="#3a0ca3"
      >
        Recent Tests
      </Text>

      <Flex w="100%" flexWrap="wrap">
        <SingleText />

        <SingleText />
        <SingleText />
        <SingleText />
        <SingleText />

        <SingleText />
        <SingleText />

        <SingleText />
        <SingleText />
        <SingleText />
      </Flex>
    </Flex>
  );
};
export default RecentTest;
