import React from "react";
import { Heading, Box, Text } from "@chakra-ui/react";

export default function Anouncement() {
  return (
    <div>
      <Heading as="h2" m={12} size="2xl" color="purple.600">
        ANNOUNCEMENT
      </Heading>
      <Box w="95%" boxShadow='base' m={12} p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Heading as="h3" size="lg">
          Class Field Trip
        </Heading>
        <Text fontSize="xl" color="gray.500" py={2}>25 Febrauary, 2022</Text>
        <Text fontSize="xl" color="gray.800" py={4}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries,
        </Text>
      </Box>
    </div>
  );
}
