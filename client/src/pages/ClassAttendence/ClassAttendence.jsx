import React from "react";
import { Flex, Text } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const ClassAttendence = () => {
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
        color="#4cc9f0"
      >
        Class -B Attendance
      </Text>
      <Flex m="1rem">
        <Text mr="1rem" fontSize={{ base: "1rem", md: "1.2rem" }}>
          Date:
        </Text>
        <input
          style={{
            backgroundColor: "#D3D3D3",
            padding: "0.4rem",
            borderRadius: "1rem",
          }}
          type="date"
          name=""
          id=""
        />
      </Flex>
      <Flex mt="2rem" w="100%" justifyContent="center" alignItems="center">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Roll number</Th>
              <Th>Name</Th>
              <Th>present/absent</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>01</Td>
              <Td>Student1</Td>
              <Td>
                {" "}
                <input type="checkbox" name="" id="" />{" "}
              </Td>
            </Tr>
            <Tr>
              <Td>01</Td>
              <Td>Student1</Td>
              <Td>
                {" "}
                <input type="checkbox" name="" id="" />{" "}
              </Td>
            </Tr>
            <Tr>
              <Td>01</Td>
              <Td>Student1</Td>
              <Td>
                {" "}
                <input type="checkbox" name="" id="" />{" "}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};
export default ClassAttendence;
