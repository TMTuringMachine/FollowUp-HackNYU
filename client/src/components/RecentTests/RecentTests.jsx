import React,{useEffect, useState} from 'react'
import axios from "../../utils/axios";
import { Box, Flex, Text } from "@chakra-ui/layout";
import SingleText from "./SingleTest";
import { useSelector} from "react-redux";

const RecentTest = () => {
  const [tests,setTests] = useState([]);
  const user = useSelector((store)=>store.auth.user)
  const getData = async()=>{
    const response = await axios.get(`/student/getAllTests/${user._id}`);
    setTests(response.data.allTests)
  }

  useEffect(() => {
   getData()
  }, [])

  return (
    <Flex
      m="1rem 4rem"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Text
        fontWeight="800"
        fontSize={{ base: "1rem", md: "3.5rem" }}
        color="#3a0ca3"
      >
        Recent Tests
      </Text>

      <Flex w="100%" flexWrap="wrap">

        {tests.length>0?tests.map((element)=>{
          return(
          <SingleText props={element} />
          )
        }):null
        }       
      </Flex>
    </Flex>
  );
};
export default RecentTest;
