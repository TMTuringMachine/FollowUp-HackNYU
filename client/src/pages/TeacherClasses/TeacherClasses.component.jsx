import React from "react";
import { Text, Box, SimpleGrid } from "@chakra-ui/react";
import { Icon } from '@iconify/react';
import ClassOverview from "../../components/ClassOverview/classOverview.component";

const TeacherClasses = () => {
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
        onClick={()=>{console.log("erjfnwkj")}}
        cursor="pointer"
      ><Icon icon="carbon:add" fontSize="4em" color="#4CC9F0"/></Box>

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
