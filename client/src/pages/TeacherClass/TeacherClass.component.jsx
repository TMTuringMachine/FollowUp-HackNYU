import { Box, Text, Button, Input } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import AddSubjectModal from "./AddSubjectModal";
import AddTestModal from "./AddTestModal";
import AddAnnouncementModal from "./AddAnnouncementModal";

import { getClass } from "../../hooks/useClass";
import { useLocation } from "react-router-dom";

const StudentOverview = () => (
  <Box
    display="flex"
    flexDirection="row"
    justifyContent="space-between"
    padding="15px 10px"
    borderBottom="1px solid #c4c4c4"
    width="100%"
  >
    <Box width="10%">
      <Text fontWeight={400} fontSize="lg">
        01
      </Text>
    </Box>
    <Box width="50%">
      <Text fontWeight={400} fontSize="lg">
        Aniwekfnwek Bajkfnwkena Ciwafnwk
      </Text>
    </Box>
    <Box width="20%">
      <Text fontWeight={400} fontSize="lg">
        30%
      </Text>
    </Box>
    <Box width="20%">
      <Text fontWeight={400} fontSize="lg">
        9876543211
      </Text>
    </Box>
  </Box>
);

const TeacherClass = () => {
  const navigate = useNavigate();
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [classData, setClassData] = useState(null);
  const location = useLocation();
  const toggleSubjectModal = () => {
    setShowSubjectModal(!showSubjectModal);
  };
  const toggleTestModal = () => {
    setShowTestModal(!showTestModal);
  };
  const toggleAnnouncementModal = () => {
    setShowAnnouncementModal(!showAnnouncementModal);
  };

  useEffect(() => {
    const classId = location.pathname.slice(15);
    getClass(classId).then((res) => {
      setClassData(res);
    });
  }, []);

  return (
    <Box padding="50px 20px 100px 20px">
      <Box
        height="280px"
        width="100%"
        boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
        borderRadius={5}
        overflow="hidden"
      >
        <Text
          fontWeight="800"
          fontSize={{ base: "1rem", md: "3.5rem" }}
          color="#4CC9F0"
          margin="20px 0 0 20px"
        >
          {classData?.name}
        </Text>
        <Text color="#888888" margin="5px 0px 0px 20px" fontSize="2xl">
          {classData?.students?.length} students
        </Text>
        <Text color="#888888" margin="0px 0px 0px 20px" fontSize="2xl">
          {classData?.subjects?.length} subjects
        </Text>
        <Box margin="30px 0 0 20px">
          <Button
            backgroundColor="#4CC9F0"
            color="#fff"
            _hover={{}}
            borderRadius="5px"
            marginRight="20px"
            rightIcon={<Icon icon="carbon:add-filled" fontSize="1.2em" />}
            onClick={toggleSubjectModal}
          >
            ADD SUBJECT
          </Button>
          <AddSubjectModal
            state={showSubjectModal}
            toggleModal={toggleSubjectModal}
            classId={classData?._id}
          />
          <Button
            backgroundColor="#4CC9F0"
            color="#fff"
            _hover={{}}
            borderRadius="5px"
            marginRight="20px"
            rightIcon={
              <Icon icon="ant-design:check-circle-filled" fontSize="1.2em" />
            }
            onClick={() => {
              navigate("/teacher/class/cwekjnwe/attendance");
            }}
          >
            MARK ATTENDANCE
          </Button>
          <Button
            backgroundColor="#4CC9F0"
            color="#fff"
            _hover={{}}
            borderRadius="5px"
            marginRight="20px"
            rightIcon={
              <Icon
                icon="healthicons:i-exam-multiple-choice"
                fontSize="1.2em"
              />
            }
            onClick={toggleTestModal}
          >
            MARK TEST
          </Button>
          <AddTestModal
            state={showTestModal}
            toggleModal={toggleTestModal}
            subjects={classData?.subjects || []}
            classId={classData?._id}
          />
          <Button
            backgroundColor="#4CC9F0"
            color="#fff"
            _hover={{}}
            borderRadius="5px"
            marginRight="20px"
            rightIcon={
              <Icon
                icon="healthicons:i-exam-multiple-choice"
                fontSize="1.2em"
              />
            }
            onClick={toggleAnnouncementModal}
          >
            MAKE ANNOUNCEMENT
          </Button>
          <AddAnnouncementModal
            state={showAnnouncementModal}
            toggleModal={toggleAnnouncementModal}
          />
        </Box>
      </Box>
      <Input
        display="inline"
        width="20%"
        variant="outline"
        placeholder="Search Students"
        backgroundColor="#fff"
        border="2px solid #888888"
        _focus=""
        margin="20px 0px"
        // value={searchText}
        // onChange={(e) => {
        //   setSearchText(e.target.value);
        // }}
      />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="5px 10px"
        backgroundColor="#EFEFEF"
        width="100%"
      >
        <Box width="10%">
          <Text fontWeight={600} fontSize="lg">
            Roll No
          </Text>
        </Box>
        <Box width="50%">
          <Text fontWeight={600} fontSize="lg">
            Name
          </Text>
        </Box>
        <Box width="20%">
          <Text fontWeight={600} fontSize="lg">
            Attendance
          </Text>
        </Box>
        <Box width="20%">
          <Text fontWeight={600} fontSize="lg">
            Phone No
          </Text>
        </Box>
      </Box>
      <Box marginBottom="50px">
        <StudentOverview />
        <StudentOverview />
        <StudentOverview />
        <StudentOverview />
        <StudentOverview />
        <StudentOverview />
        <StudentOverview />
        <StudentOverview />
      </Box>
    </Box>
  );
};

export default TeacherClass;
