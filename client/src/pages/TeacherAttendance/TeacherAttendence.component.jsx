import React, { useState } from "react";
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
  Checkbox,
  Button,
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";


const DatePickerContainer = styled("div")(()=>({
    margin:"20px 0 0 20px",
    fontSize:'1.5em',

    '& .react-datepicker-wrapper':{
        display:'inline',
    },
}))

const TeacherAttendance = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Box padding="10px 20px 100px 20px">
      <Text
        fontWeight="800"
        fontSize={{ base: "1rem", md: "3.5rem" }}
        color="#4CC9F0"
        margin="20px 0 0 20px"
      >
        CLASS B - ATTENDANCE
      </Text>
      <DatePickerContainer >
        <Text>Date:</Text>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </DatePickerContainer>
      <Box
        height="fit-content"
        width="80%"
        boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
        borderRadius={5}
        overflow="hidden"
        padding="20px 0px"
        margin="20px 0 0 20px"
      >
        <Table>
          <Thead>
            <Tr>
              <Th>Roll No</Th>
              <Th>Name</Th>
              <Th>isAbsent</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(20)].map((i, idx) => (
              <Tr>
                <Td>{idx + 1}</Td>
                <Td>Aweknfkwe Bwekjfnwke Cweifknw</Td>
                <Td>
                  <Checkbox colorScheme="red" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TeacherAttendance;
