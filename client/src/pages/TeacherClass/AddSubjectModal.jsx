import React from "react";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import { Modal } from "@mui/material";

const AddSubjectModal = ({ state, toggleModal }) => {
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
          <Input placeholder="Subject Name" borderColor="#888888" width="80%" />
          <Input placeholder="Total Marks" borderColor="#888888" width="50%" marginTop="15px"/>
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

export default AddSubjectModal;
