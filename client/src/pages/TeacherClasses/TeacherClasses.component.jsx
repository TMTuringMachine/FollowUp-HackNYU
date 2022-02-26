import React, { useState } from "react";
import { Text, Box, SimpleGrid, Input, Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import ClassOverview from "../../components/ClassOverview/classOverview.component";

import { Modal } from "@mui/material";

const ClassModal = ({ state, toggleModal }) => {
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
          CREATE A CLASS
        </Text>
        <Input placeholder="Class Name" borderColor="#888888" width="80%" />
        <Button
          backgroundColor="#4CC9F0"
          color="#fff"
          _hover={{}}
          borderRadius="5px"
          margin="20px 0"
        >
          CREATE
        </Button>
      </Box>
    </Modal>
  );
};

const TeacherClasses = () => {
  const [showClassModal, setShowClassModal] = useState(false);

  const toggleClassModal = () => {
    setShowClassModal(!showClassModal);
  };

  return (
    <Box padding="50px 20px 100px 20px">
      <Text
        fontWeight="800"
        fontSize={{ base: "1rem", md: "2.5rem" }}
        color="#3a0ca3"
        marginBottom="20px"
      >
        MY CLASSES
      </Text>
      <Box
        width="80px"
        height="80px"
        borderRadius="80px"
        boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
        position="fixed"
        backgroundColor="#fff"
        display="grid"
        placeItems="center"
        top="80vh"
        right="100px"
        zIndex={99999}
        onClick={toggleClassModal}
        cursor="pointer"
      >
        <Icon icon="carbon:add" fontSize="4em" color="#4CC9F0" />
      </Box>
      <ClassModal state={showClassModal} toggleModal={toggleClassModal} />
      <SimpleGrid columns={3} spacing={20}>
        <ClassOverview />
        <ClassOverview />
        <ClassOverview />
        <ClassOverview />
        <ClassOverview />
        <ClassOverview />
        <ClassOverview />
      </SimpleGrid>
    </Box>
  );
};

export default TeacherClasses;
