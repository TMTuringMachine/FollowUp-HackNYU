import React, { useState } from "react";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import { Modal } from "@mui/material";
import { addSubject } from "../../hooks/useClass";
import { useSnackbar } from "notistack";
const AddSubjectModal = ({ state, toggleModal, classId }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [subjectData, setSubjectData] = useState({
    name: "",
    totalMarks: 0,
  });

  const handleInput = (e) => {
    setSubjectData({ ...subjectData, [e.target.name]: e.target.value });
  };

  const handleAddSubject = () => {
    const data = {
      ...subjectData,
      classID: classId,
    };
    console.log(data);
    addSubject(data, enqueueSnackbar);
    setSubjectData({
      name: "",
      totalMarks: 0,
    });
    toggleModal();
  };

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
          ADD SUBJECT TO CLASS
        </Text>
        <Box width="90%">
          <Input
            placeholder="Subject Name"
            borderColor="#888888"
            width="80%"
            name="name"
            value={subjectData.name}
            onChange={handleInput}
          />
          <Input
            placeholder="Total Marks"
            borderColor="#888888"
            width="50%"
            marginTop="15px"
            name="totalMarks"
            value={subjectData.totalMarks}
            onChange={handleInput}
          />
        </Box>

        <Button
          backgroundColor="#4CC9F0"
          color="#fff"
          _hover={{}}
          borderRadius="5px"
          margin="20px 0"
          onClick={handleAddSubject}
        >
          ADD
        </Button>
      </Box>
    </Modal>
  );
};

export default AddSubjectModal;
