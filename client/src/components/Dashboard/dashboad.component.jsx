import { Box } from "@chakra-ui/layout";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { Image, Avatar, SimpleGrid, GridItem, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { initializeUser } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { Text } from "@chakra-ui/layout";
import CourseOverview from "../../components/courseOverview/courseOverview.component";
import myteaching from "../../assets/images/myteaching.png";
import {  useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const getData = async (req, res) => {
    try {
      let data = await axios.get("/user/myTeachings", {
        headers: {
          "Content-type": "application/json",
        },
      });
      setCourse(data.data.courses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    console.log("Course", course);
  }, []);
  let user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    initializeUser(dispatch);
  }, [dispatch]);
  console.log(user);
  return (
    <>
      <Flex
        fontFamily="'Montserrat', sans-serif"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {!user?.hasProfile ? (
          <Box
            fontSize={{ base: "1rem", md: "2rem" }}
            p="20px 70px 50px 70px"
            boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
            m="4rem"
            borderRadius="5px"
          >
            Oops! You Do not have a profile.
            <br />
            <Button
              color="white"
              m="1rem 0rem"
              fontSize="1.2rem"
              w="100%"
              _hover={{ bg: "#a6a0ff" }}
              backgroundColor="#6c63ff"
            >
              <Link to="/createProfile">Create Your Profile</Link>
            </Button>
          </Box>
        ) : (
          <Flex
            width={["90%", "90%", "70%", "65%", "60%"]}
            padding="20px"
            boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
            margin="30px"
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
                {user?.isTeacher ? (
                  <Text
                    display="inline"
                    fontSize="md"
                    fontWeight="600"
                    marginLeft="20px"
                    border="2px solid 	#50C878"
                    color="	#50C878"
                    padding="1px 15px"
                    borderRadius="5px"
                  >
                    TEACHER
                  </Text>
                ) : null}
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
                  Education:
                </Text>
                <Text fontSize="xl">{user.education}</Text>
              </Flex>
              <Flex alignItems="center">
                <Text
                  fontWeight="500"
                  fontSize="xl"
                  marginRight="10px"
                  marginTop="5px"
                >
                  Age:
                </Text>
                <Text fontSize="xl">{user.age}</Text>
              </Flex>
              <Flex>
                <Flex alignItems="flex-end">
                  <Text
                    fontWeight="500"
                    fontSize="xl"
                    marginRight="10px"
                    marginTop="5px"
                  >
                    Purchased:
                  </Text>
                  <Text fontSize="xl">{user.myEnrolledCourses.length}</Text>
                </Flex>
                <Flex alignItems="flex-end" marginLeft="20px">
                  <Text
                    fontWeight="500"
                    fontSize="xl"
                    marginRight="10px"
                    marginTop="5px"
                  >
                    Created:
                  </Text>
                  <Text fontSize="xl">{course.length}</Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        )}

        {user?.isTeacher ? (
          <>
              <Text>Your Teachings</Text>
              {course.length>0 ? (
                <Flex width={'95vw'}>

                  <SimpleGrid
                    columns={[2, 2, 3, 4, 5]}
                    spacing={["10px", "20px", "25px", "25px", "30px"]}
                    width="100%"
                    margin="20px auto 20px auto"
                  >
                    {course.map((corr) => {
                      return (
                        <GridItem>
                          <CourseOverview course={corr} />
                        </GridItem>
                      );
                    })}
                  </SimpleGrid>
                
                </Flex>
              ) : (
                <>
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Image
                      w={{ base: "5rem", md: "10rem" }}
                      h={{ base: "5rem", md: "10rem" }}
                      m="2rem"
                      src={myteaching}
                    ></Image>
                    <Center
                      fontSize={{ base: "1rem", md: "1.7rem" }}
                      textAlign="center"
                    >
                      You havent made any courses yet. Make a course and start
                      teaching !
                    </Center>
                    <Button
                      m="2rem"
                      color="white"
                      _hover={{ bg: "#a6a0ff" }}
                      backgroundColor="#6c63ff"
                      onClick={()=>{
                        navigate('/createCourse')
                      }}
                    >
                      Create a Course here!
                    </Button>
                  </Flex>
                </>
              )}
            
          </>
        ) : (
          <></>
        )}
      </Flex>
    </>
  );
};
export default DashBoard;
