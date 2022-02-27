import {
  Box,
  Text,
  SimpleGrid,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getTest,setStudentMarks } from "../../hooks/useClass";

const StudentMarks = ({ test,student }) => {
  const [subjectsData, setSubjectsData] = useState([]);

  const addSubjectMarks = (sub_id, marks) => {
    const l = subjectsData.find((a) => a.subject === sub_id);
    if (l === undefined) {
      setSubjectsData([
        ...subjectsData,
        { subject: sub_id, marksObtained: marks },
      ]);
    } else {
      const ns = subjectsData.filter(a => a.subject !== sub_id);
      setSubjectsData([
        ...ns,
        {subject:sub_id,marksObtained:marks}
      ])
    }
  };

  const handleSaveMarks = () => {
    // console.log(subjectsData);
    const data = {
      studentID:student._id,
      testID:test._id,
      subjects:[...subjectsData]
    }
    setStudentMarks(data);
    console.log(data);
  };

  return (
    <Tr>
      <Td>{student.name}</Td>
      {test?.subjects.map((sub) => (
        <Td>
          <Input
            borderColor="#888888"
            maxWidth="120px"
            onChange={(e) => {
              addSubjectMarks(sub?._id, e.target.value);
            }}
          />
        </Td>
      ))}

      <Td>
        <Button
          size="sm"
          backgroundColor="#4CC9F0"
          color="#fff"
          _hover={{}}
          _focus={{ outline: "none" }}
          onClick={handleSaveMarks}
        >
          SAVE
        </Button>
      </Td>
    </Tr>
  );
};

const TeacherTestMarks = () => {
  const { testId, id } = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    console.log(id, testId);
    getTest(testId).then((res) => {
      setTest(res);
    });
  }, [testId, id]);

  return (
    <Box padding="10px 20px 100px 20px">
      <Text
        fontWeight="800"
        fontSize={{ base: "1rem", md: "3.5rem" }}
        color="#4CC9F0"
        margin="20px 0 0 20px"
      >
        {test?.classID?.name}   {test?.name}
      </Text>
      <Box
        height="fit-content"
        width="100%"
        boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
        borderRadius={5}
        overflow="hidden"
        padding="20px 0px"
      >
        <Table>
          <Thead>
            <Th>Student/Subject</Th>
            {test?.subjects.map((sub) => (
              <Th>{sub.name}</Th>
            ))}

            <Th>SAVE</Th>
          </Thead>
          <Tbody>
            {
              test?.classID?.students.map(student => <StudentMarks test={test} student={student}/>)
            }
            {/* <StudentMarks test={test} />
            <StudentMarks test={test} />
            <StudentMarks test={test} />
            <StudentMarks test={test} />
            <StudentMarks test={test} />
            <StudentMarks test={test} /> */}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default TeacherTestMarks;
