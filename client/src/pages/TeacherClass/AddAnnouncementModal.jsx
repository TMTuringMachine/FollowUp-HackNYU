import React, { useState } from "react";
import { Box, Text, Input, Button, Textarea } from "@chakra-ui/react";
import { Modal } from "@mui/material";
import { useSnackbar } from "notistack";
import { addAnnouncement } from "../../hooks/useClass";

const AddAnnouncementModal = ({ state, toggleModal, classId }) => {
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    description: "",
  });

  const handleInput = (e) => {
    setAnnouncementData({
      ...announcementData,
      [e.target.name]: e.target.value,
    });
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleAddAnnouncement = () => {
    const data = {
      ...announcementData,
      classID: classId,
    };
    console.log(data);
    addAnnouncement(data, enqueueSnackbar);
    setAnnouncementData({
      title: "",
      description: "",
    });
    toggleModal();
  };

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
          <Input
            placeholder="Announcement title"
            borderColor="#888888"
            width="100%"
            marginBottom="20px"
            name="title"
            onChange={handleInput}
            value={announcementData.title}
          />
          <Textarea
            placeholder="Announcement details..."
            borderColor="#888888"
            width="100%"
            rows={5}
            size="lg"
            name="description"
            onChange={handleInput}
            value={announcementData.description}
          />
        </Box>

        <Button
          backgroundColor="#4CC9F0"
          color="#fff"
          _hover={{}}
          borderRadius="5px"
          margin="20px 0"
          onClick={handleAddAnnouncement}
        >
          ANNOUNCE
        </Button>
      </Box>
    </Modal>
  );
};

export default AddAnnouncementModal;
