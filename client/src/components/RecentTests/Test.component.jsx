import React,{useEffect} from 'react'
import { Flex, Text, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import shadows from "../../theme/shadows";
import axios from "../../utils/axios";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import PieChartComponent from "./PieChart";
const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];
const Test = () => {

    const getData = async()=>{
      console.log("I was called")
      const response = await axios.get("/student/getAllTests/621a560e59c8cc20cee9786f");
      console.log(response.data.allTests[0])
    }

    useEffect(() => {
     getData()
    }, [])
    
  

  return (
    <Box>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="flex-start"
        m="1rem"
        ml="4rem"
      >
        <Text
          fontWeight="800"
          fontSize={{ base: "1rem", md: "3.5rem" }}
          color="#3a0ca3"
        >
          Unit 1
        </Text>
        <Text m="0.2rem" color="gray">
          25 Febrauary, 2022
        </Text>
        <Flex
          p="2rem"
          m="2rem"
          width="80%"
          flexDir="column"
          boxShadow={shadows.shadow3}
          justifyContent="center"
        >
          <table style={{ width: "80%" }}>
            <tr style={{ marginBottom: "1rem" }}>
              <th>Subject</th>
              <th>Sub1</th>
              <th>Sub1</th>
              <th>Sub1</th>
              <th>Sub1</th>
            </tr>
            <tr>
              <th>Marks</th>
              <td>50/100</td>
              <td>50/100</td>
              <td>50/100</td>
              <td>50/100</td>
            </tr>
          </table>
          <Button
            w="20%"
            p="0rem"
            backgroundColor="#4cc9f0"
            color="white"
            mt="1rem"
          >
            Download Report Card
          </Button>
        </Flex>
        <Flex flexWrap="wrap" w="100%" h="300px">
          <ResponsiveContainer mr="2rem" width="400px" height="100px">
            <PieChartComponent data01={data01} data02={data02} />
          </ResponsiveContainer>
          <ResponsiveContainer width="400px" height="100px">
            <PieChartComponent data01={data01} data02={data02} />
          </ResponsiveContainer>
          <ResponsiveContainer width="400px" height="100px">
            <PieChartComponent data01={data01} data02={data02} />
          </ResponsiveContainer>{" "}
        </Flex>
        <br />
        <br />
        <br />
        <br />
      </Flex>
    </Box>
  );
};
export default Test;
