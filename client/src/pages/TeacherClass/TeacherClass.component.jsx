import {
  Box,
  Text,
  Button,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import axios from "../../utils/axios";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import AddSubjectModal from "./AddSubjectModal";
import AddTestModal from "./AddTestModal";
import AddAnnouncementModal from "./AddAnnouncementModal";

import { getClass } from "../../hooks/useClass";
import { useLocation, useParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import DeleteModal from "../../components/deleteModal.componment";
import { Rating } from "@mui/material";

const StudentOverview = ({ student, classId, teacherID }) => (
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
        {student?.name}
      </Text>
    </Box>
    <Box width="20%">
      <Text fontWeight={400} fontSize="lg">
        0%
      </Text>
    </Box>
    <Box width="10%">
      <Text fontWeight={400} fontSize="lg">
        {student?.phone}
      </Text>
    </Box>
    <Box width="10%">
      <Button
        height={"30px"}
        onClick={async () => {
          const res = await axios.post("/teacher/removeStudent", {
            classID: classId,
            studentID: student?._id,
            teacherID: teacherID,
          });
          console.log(res);
        }}
        colorScheme={"red"}
      >
        Remove
      </Button>
    </Box>
  </Box>
);

const TestOverview = ({ test, classId }) => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (test) {
      const ns = test.subjects.map((s) => s.name);
      setSubjects([...ns]);
      console.log(ns, test.subjects);
    }
  }, [test]);
  return (
    <Fade left>
      <Box
        boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
        borderRadius="5px"
        overflow="hidden"
        width="50%"
        padding="20px"
      >
        <Text fontSize="3xl" fontWeight={600}>
          {test?.name}
        </Text>
        <Text fontSize="lg" color="#858585">
          Date: {test?.date}
        </Text>
        <Text fontSize="lg" color="#858585">
          Time: {test?.time}
        </Text>
        <Text fontSize="lg" color="#444444">
          Subjects: {subjects.join(", ")}
        </Text>
        <Button
          backgroundColor="#4CC9F0"
          color="#fff"
          _hover={{}}
          borderRadius="5px"
          marginTop="20px"
          onClick={() => {
            navigate(`/teacher/class/${classId}/test/${test._id}`);
          }}
        >
          VIEW MARKS ALLOCATION
        </Button>
      </Box>
    </Fade>
  );
};

const TeacherClass = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const navigate = useNavigate();
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [classData, setClassData] = useState(null);
  const location = useLocation();
  const params = useParams();
  const toggleSubjectModal = () => {
    setShowSubjectModal(!showSubjectModal);
  };
  const toggleTestModal = () => {
    setShowTestModal(!showTestModal);
  };
  const toggleAnnouncementModal = () => {
    setShowAnnouncementModal(!showAnnouncementModal);
  };

  const handleDeleteClass = async () => {
    const res = await axios.post("/teacher/deleteClass", {
      classID: classData?._id,
      teacherID: classData?.teacher,
    });
    console.log(res);
    navigate("/teacher/classes");
  };

  useEffect(() => {
    const classId = params.id;

    getClass(classId).then((res) => {
      setClassData(res);
    });
  }, []);

  return (
    <Box padding="20px 20px 100px 20px">
      <Box
        height="350px"
        width="100%"
        boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
        borderRadius={5}
        overflow="hidden"
        margin="10px 0"
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
              navigate(`/teacher/class/${classData._id}/attendance`);
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
              <Icon icon="ant-design:notification-filled" fontSize="1.2em" />
            }
            onClick={toggleAnnouncementModal}
          >
            MAKE ANNOUNCEMENT
          </Button>
          <Button onClick={toggleDeleteModal} colorScheme={"red"}>
            Delete Class
          </Button>
          <AddAnnouncementModal
            state={showAnnouncementModal}
            toggleModal={toggleAnnouncementModal}
            classId={classData?._id}
          />
        </Box>
        <Text
          marginLeft="20px"
          marginTop="20px"
          boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
          width="fit-content"
          padding="10px 20px"
        >
          Class Code: {classData?._id}
        </Text>
      </Box>
      <DeleteModal
        state={showDeleteModal}
        toggleModal={toggleDeleteModal}
        onNo={toggleDeleteModal}
        onYes={handleDeleteClass}
      />

      <Tabs marginTop="30px">
        <TabList>
          <Tab _focus={{ outline: "none" }}>STUDENTS</Tab>
          <Tab _focus={{ outline: "none" }}>TESTS</Tab>
          <Tab _focus={{ outline: "none" }}>FEEDBACKS</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
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
              {classData?.students.map((student) => (
                <StudentOverview
                  student={student}
                  classId={classData?._id}
                  teacherID={classData?.teacher}
                />
              ))}
            </Box>
          </TabPanel>
          <TabPanel>
            {classData?.tests.map((t) => (
              <TestOverview
                test={t}
                classId={classData?._id}
                teacherID={classData?.teacher}
              />
            ))}
          </TabPanel>
          <TabPanel>
            {classData?.feedback.map((fd) => (
              <Fade left>
                <Box
                boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
                padding="20px"
                width="50%"
              >
                <Rating value={fd.rating} readOnly /> <Text>{fd.Text}</Text>
              </Box>
              </Fade>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TeacherClass;
