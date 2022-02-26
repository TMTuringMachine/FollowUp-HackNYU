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

const AddTestModal = ({ state, toggleModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState("10:00");

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
          />
          <Text fontWeight={600} fontSize="lg">
            Select Subjects:
          </Text>

          <SimpleGrid columns={2} width="100%" marginBottom="15px">
            <Checkbox>Subject Name</Checkbox>
            <Checkbox>Subject Name</Checkbox>
            <Checkbox>Subject Name</Checkbox>
            <Checkbox>Subject Name</Checkbox>
          </SimpleGrid>
          <Box marginBottom="15px">
            <Text fontWeight={600} fontSize="lg">
              Date:
            </Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Box>
          <Box marginBottom="15px">
            <Text fontWeight={600} fontSize="lg">
              Time:
            </Text>
            <CustomTimePicker onChange={onChange} value={value} />
          </Box>
        </Box>

        <Button
          backgroundColor="#4CC9F0"
          color="#fff"
          _hover={{}}
          borderRadius="5px"
          margin="20px 0"
        >
          ADD
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTestModal;
