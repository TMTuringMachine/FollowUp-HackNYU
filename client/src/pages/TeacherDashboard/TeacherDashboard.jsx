import React,{useState,useEffect} from "react";
import {Flex,Text,Avatar, Box} from '@chakra-ui/react'
import { useSelector } from "react-redux";
import { getAllClasses} from "../../hooks/useClass";
const TeacherDashboard = () => {
  const user = useSelector((store) => store.auth.user);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getAllClasses(user._id).then((res) => {
      setClasses(res);
    });
  }, [user]);

  console.log("classes",classes)
  return (
    <>
      <Flex m="1rem 4rem" flexDir="column" justifyContent="center">
        <Text
          fontWeight="800"
          fontSize={{ base: "1rem", md: "2.5rem" }}
          color="#3a0ca3"
          textAlign={"center"}
        >
          Teacher Dashboard
        </Text>

        <Text
          fontWeight="800"
          fontSize={{ base: "1rem", md: "1.5rem" }}
          color="#4CC9F0"
          textAlign={"center"}
        >
          Welcome {user.name}!
        </Text>

        <Flex
          width={["90%", "90%", "70%", "65%", "60%"]}
          padding="20px"
          boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
          margin="30px"
          marginLeft={"auto"}
          marginRight={"auto"}
        >
          <Avatar
            src={user.image}
            width={["100px", null, "150px", "150px", "200px"]}
            height={["100px", null, "150px", "150px", "200px"]}
          />
          <Box marginLeft="20px">
            <Flex alignItems="center">
              <Text fontSize="3xl" fontWeight="600">
                {user.name}
              </Text>
            </Flex>
            <Flex alignItems="flex-end">
              <Text
                fontWeight="500"
                fontSize="xl"
                marginRight="10px"
                marginTop="5px"
              >
                Email:
              </Text>
              <Text fontSize="xl">{user.email}</Text>
            </Flex>
            <Flex alignItems="center">
              <Text
                fontWeight="500"
                fontSize="xl"
                marginRight="10px"
                marginTop="5px"
              >
                Qualification:
              </Text>
              <Text fontSize="xl">{user.qualification}</Text>
            </Flex>
            <Flex alignItems="center">
              <Text
                fontWeight="500"
                fontSize="xl"
                marginRight="10px"
                marginTop="5px"
              >
                Total Classes:
              </Text>
              <Text fontSize="xl">{classes.length}</Text>
            </Flex>
            <Flex></Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default TeacherDashboard;
