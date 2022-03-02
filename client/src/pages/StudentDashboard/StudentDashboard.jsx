import React, { useState } from "react";
import {
  Flex,
  Text,
  Box,
  Avatar,
  Button,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Modal } from "@mui/material";
import axios from "../../utils/axios";

const StudentDashboard = () => {
  const user = useSelector((store) => store.auth.user);
  console.log(user);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [id, setID] = useState();
  const handleJoin = async (e) => {
    e.preventDefault();
    const response = await axios.post("/student/joinClass", {
      studentID: user._id,
      classID: id,
    });

    console.log(response);
  };

  return (
    <>
      <Flex m="1rem 4rem" flexDir="column" justifyContent="center">
        <Text
          fontWeight="800"
          fontSize={{ base: "1rem", md: "2.5rem" }}
          color="#3a0ca3"
          textAlign={"center"}
        >
          Student Dashboard
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
          borderRadius="5px"
        >
          <Avatar
            src={user.image}
            width={["100px", null, "130px", "130px", "160px"]}
            height={["100px", null, "130px", "130px", "160px"]}
          />
          <Box marginLeft="40px">
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
                Phone:
              </Text>
              <Text fontSize="xl">{user.phone}</Text>
            </Flex>
            <Flex></Flex>
          </Box>
        </Flex>

        <Flex alignItems={"center"} flexDirection={"column"}>
          {user.class ? // <Text fontSize="xl" fontWeight={600} color="#3A0CA3">
          //   {user.class.name}
          // </Text>
          null : (
            <>
              <Flex>
                <Text
                  fontWeight="800"
                  fontSize={{ base: "1rem", md: "2rem" }}
                  color="#3a0ca3"
                  textAlign={"center"}
                >
                  You Havent Joined Any Class
                </Text>
              </Flex>
              <Flex>
                <Button
                  onClick={handleOpen}
                  marginTop={"1rem"}
                  colorScheme={"teal"}
                >
                  Join Class
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
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
                    <Input
                      placeholder="Enter Class ID"
                      borderColor="#888888"
                      width="100%"
                      marginBottom="20px"
                      name="title"
                      onChange={(e) => {
                        setID(e.target.value);
                      }}
                    />

                    <Button
                      backgroundColor="#4CC9F0"
                      color="#fff"
                      _hover={{}}
                      borderRadius="5px"
                      margin="20px 0"
                      onClick={handleJoin}
                    >
                      JOIN
                    </Button>
                  </Box>
                </Modal>
              </Flex>
            </>
          )}
        </Flex>
        {user.class ? (
          <Box
            width={["90%", "90%", "70%", "65%", "60%"]}
            padding="20px"
            boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
            margin="30px"
            marginLeft={"auto"}
            marginRight={"auto"}
            borderRadius="5px"
          >
            <Box marginBottom="30px">
              <Text fontSize="2xl"  fontWeight={600} >CLASS DETAILS: </Text>
              <Flex><Text fontSize="xl" fontWeight={500}>Name:  </Text> <Text fontSize="xl" fontWeight={300}>{user?.class?.name}</Text></Flex>
              <Flex><Text fontSize="xl" fontWeight={500}>Students:  </Text> <Text fontSize="xl" fontWeight={300}>{user?.class?.students?.length}</Text></Flex>
              <Flex><Text fontSize="xl" fontWeight={500}>Subjects:  </Text> <Text fontSize="xl" fontWeight={300}>{user?.class?.subjects?.length}</Text></Flex>
              <Flex><Text fontSize="xl" fontWeight={500}>Tests:  </Text> <Text fontSize="xl" fontWeight={300}>{user?.class?.tests?.length}</Text></Flex>
            </Box>
          </Box>
        ) : null}
      </Flex>
    </>
  );
};

export default StudentDashboard;
