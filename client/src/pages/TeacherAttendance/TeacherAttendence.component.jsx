import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { getClass } from "../../hooks/useClass";
import { markAttendance } from "../../hooks/useClass";
import { useSnackbar } from "notistack";
const DatePickerContainer = styled("div")(() => ({
  margin: "20px 0 0 20px",
  fontSize: "1.5em",

  "& .react-datepicker-wrapper": {
    display: "inline",
  },
}));

const TeacherAttendance = () => {
  const location = useLocation();
  const [student, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    const classId = location.pathname.slice(15, 39);
    console.log(classId);
    getClass(classId).then((res) => {
      setStudents(res.students);
      console.log(res.students);
      res.students.forEach((st) => {
        setAttendanceData((attendanceData) => [
          ...attendanceData,
          {
            studentID: st._id,
            date: startDate,
            isPresent: true,
          },
        ]);
      });
    });
  }, []);
  const onChangeHandler = (e, student_id) => {
    const newAtten = attendanceData.map((atte) => {
      console.log(atte);
      if (atte.studentID === student_id) {
        console.log("here i am");
        atte.isPresent = !e.target.checked;
      }
      return atte;
    });
    setAttendanceData(newAtten);
    console.log(attendanceData);
  };

  const onSubmitHandler = () => {
    markAttendance(attendanceData, navigate, enqueueSnackbar);
  };

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
      <DatePickerContainer>
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
            {student.map((stude, idx) => {
              return (
                <Tr>
                  <Td>{idx + 1}</Td>
                  <Td>{stude.name}</Td>
                  <Td>
                    <Checkbox
                      onChange={(e) => onChangeHandler(e, stude._id)}
                      colorScheme="red"
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Button
          onClick={onSubmitHandler}
          color="white"
          backgroundColor="#4cc9f0"
          ml="1rem"
          mt="2rem"
        >
          Submit Attendance
        </Button>
      </Box>
    </Box>
  );
};

export default TeacherAttendance;
