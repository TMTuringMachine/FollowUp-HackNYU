import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Checkbox,
  SimpleGrid,
} from "@chakra-ui/react";
import { Modal } from "@mui/material";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import styled from "styled-components";

import {addTest} from '../../hooks/useClass';

export const CustomTimePicker = styled(TimePicker)({
  "& .react-time-picker__wrapper": {
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#F5F5F5",
    padding: "5px",
    width: "80%",
  },
  "& .react-time-picker-enabled": {
    width: "80%",
  },
  "& .react-time-picker__clear-button": {
    display: "none",
  },
});

const AddTestModal = ({ state, toggleModal, subjects, classId }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");
  const [testData, setTestData] = useState({
    name: "",
    subjects: [],
    date: new Date(),
    time: "8:00",
  });

  const handleInput = (e) => {
    setTestData({ ...testData, [e.target.name]: e.target.value });
  };

  const handleTestAdd = () => {
    const data = {
      ...testData,
      date:testData.date.toLocaleDateString(),
      classID:classId
    }
    console.log(data);
    addTest(data);
  };

  const handleCheck = (id,isChecked) => {
    if(isChecked){
      setTestData({...testData,subjects:[...testData.subjects,id]})
    }else{
      const newSubjects = testData.subjects.filter(s => s !== id);
      setTestData({...testData,subjects:[...newSubjects]})

    }
  }

  return (
    <Modal open={state} onClose={toggleModal}>
      <Box
        width="30vw"
        height="fit-content"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        backgroundColor="white"
        outline="none"
        borderRadius="10px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="10px"
      >
        <Text
          fontWeight="800"
          fontSize={{ base: "1rem", md: "2rem" }}
          color="#4CC9F0"
          marginBottom="20px"
        >
          CREATE A TEST
        </Text>
        <Box width="90%">
          <Input
            placeholder="Test Name"
            borderColor="#888888"
            width="100%"
            marginBottom="15px"
            name="name"
            value={testData.name}
            onChange={handleInput}
          />
          <Text fontWeight={600} fontSize="lg">
            Select Subjects:
          </Text>

          <SimpleGrid columns={2} width="100%" marginBottom="15px">
            {subjects.map((sub) => (
              <Checkbox onChange={e => handleCheck(sub._id,e.target.checked)}>{sub?.name}</Checkbox>
            ))}
          </SimpleGrid>
          <Box marginBottom="15px">
            <Text fontWeight={600} fontSize="lg">
              Date:
            </Text>
            <DatePicker
              selected={testData.date}
              name="date"
              onChange={(date) => {
                setTestData({ ...testData, date: date });
              }}
            />
          </Box>
          <Box marginBottom="15px">
            <Text fontWeight={600} fontSize="lg">
              Time:
            </Text>
            <CustomTimePicker
              onChange={(time) => {
                setTestData({ ...testData, time: time });
              }}
              value={testData.time}
            />
          </Box>
        </Box>

        <Button
          backgroundColor="#4CC9F0"
          color="#fff"
          _hover={{}}
          borderRadius="5px"
          margin="20px 0"
          onClick={handleTestAdd}
        >
          ADD
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTestModal;
