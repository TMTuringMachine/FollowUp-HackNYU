import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import shadows from "../../theme/shadows";
const SingleTest = () => {
  return (
    <Flex
      p="0.8rem 6rem 0.8rem 0.8rem"
      m="1rem"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
      boxShadow={shadows.shadow3}
    >
      <Text fontSize="2.2rem" fontWeight="700">
        Unit1
      </Text>
      <Text m="0.2rem" color="gray">
        25 Febrauary, 2022
      </Text>
      <Button
        p="0rem"
        w="100%"
        backgroundColor="#4cc9f0"
        color="white"
        mt="1rem"
      >
        View
      </Button>
    </Flex>
  );
};
export default SingleTest;
