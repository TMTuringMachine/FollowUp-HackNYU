import React from "react";
import { Box, Text, Input, Button,Textarea } from "@chakra-ui/react";
import { Modal } from "@mui/material";

const AddAnnouncementModal = ({ state, toggleModal }) => {
  return (
    <Modal open={state} onClose={toggleModal}>
      <Box
        width="40vw"
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
          ADD ANNOUNCEMENT
        </Text>
        <Box width="90%">
          <Textarea placeholder="Announcement details..." borderColor="#888888" width="100%" size="lg"/>
          
        </Box>

        <Button
          backgroundColor="#4CC9F0"
          color="#fff"
          _hover={{}}
          borderRadius="5px"
          margin="20px 0"
        >
          ANNOUNCE
        </Button>
      </Box>
    </Modal>
  );
};

export default AddAnnouncementModal;