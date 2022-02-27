import {
  Box,
  Text,
  SimpleGrid,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
} from "@chakra-ui/react";
import React,{useEffect} from "react";

import {useParams} from 'react-router-dom';

import {getTest} from '../../hooks/useClass';

const StudentMarks = () => {
  return (
    <Tr>
      <Td>Aknewfk Boweisfjow Cwefolk</Td>
      <Td>
        <Input borderColor="#888888" maxWidth="120px" />
      </Td>
      <Td>
        <Input borderColor="#888888" maxWidth="120px" />
      </Td>
      <Td>
        <Input borderColor="#888888" maxWidth="120px" />
      </Td>
      <Td>
        <Input borderColor="#888888" maxWidth="120px" />
      </Td>

      <Td>
        <Button size="sm" backgroundColor="#4CC9F0" color="#fff" _hover={{}} _focus={{outline:"none"}}>
          SAVE
        </Button>
      </Td>
    </Tr>
  );
};

const TeacherTestMarks = () => {
  const {testId,id} = useParams();
  useEffect(()=>{
    console.log(id,testId);
    getTest(testId);
  },[testId,id]);
  return (
    <Box padding="10px 20px 100px 20px">
      <Text
        fontWeight="800"
        fontSize={{ base: "1rem", md: "3.5rem" }}
        color="#4CC9F0"
        margin="20px 0 0 20px"
      >
        CLASS B - UNIT 1
      </Text>
      <Box
        height="fit-content"
        width="100%"
        boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
        borderRadius={5}
        overflow="hidden"
        padding="20px 0px"
      >
        <Table>
          <Thead>
            <Th>Student/Subject</Th>
            <Th> Subject 1</Th>
            <Th> Subject 2</Th>
            <Th> Subject 3</Th>
            <Th> Subject 4</Th>

            <Th>SAVE</Th>
          </Thead>
          <Tbody>
            <StudentMarks />
            <StudentMarks />
            <StudentMarks />
            <StudentMarks />
            <StudentMarks />
            <StudentMarks />
            <StudentMarks />
            <StudentMarks />
            <StudentMarks />
            <StudentMarks />


          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TeacherTestMarks;
