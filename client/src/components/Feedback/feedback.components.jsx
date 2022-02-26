import React from "react";
import {
  Heading,
  Text,
  Flex,
  Textarea,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function Feedback() {
  return (
    <div>
      <Heading as="h2" ml={12} my={8} size="2xl" color="purple.600">
        FEEDBACK
      </Heading>
      <Text fontSize="2xl" ml={12} my={4}>
        Write your feedback/review for the teachers.
      </Text>
      <Flex align="baseline" mt={2} ml={12}>
        <Text fontSize="4xl" mr={2}>
          😡
        </Text>
        <Text fontSize="4xl" mx={2}>
          😒
        </Text>
        <Text fontSize="4xl" mx={2}>
          😐
        </Text>
        <Text fontSize="4xl" mx={2}>
          😀
        </Text>
        <Text fontSize="4xl" mx={2}>
          😍
        </Text>
      </Flex>
      <Textarea
        ml={12}
        my={6}
        width="90%"
        minHeight="30vh"
        placeholder="Type your feedback here..."
        borderWidth="2px" borderColor="gray.800"
      />
      <Flex ml={12}>
        <Button colorScheme="blue">Send Feedback</Button>
      </Flex>
    </div>
  );
}
