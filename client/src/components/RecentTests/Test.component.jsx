import React,{useEffect, useState} from 'react'
import { Flex, Text, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import shadows from "../../theme/shadows";
import axios from "../../utils/axios";
import { Bar,Legend,Tooltip,XAxis,YAxis,BarChart,CartesianGrid,ResponsiveContainer } from "recharts";
import { useSelector} from "react-redux";
import { useParams } from 'react-router-dom';

const Test = () => {
  const data = []
  const { id } = useParams();
  const user = useSelector((store)=>store.auth.user)
  const [tests,setTests] = useState([]);
  const [dataLen,setDataLen] = useState()
  const getData = async()=>{
    const response = await axios.get(`/student/getAllTests/${user._id}`);
    for(var i = 0;i<response.data.allTests.length;i++){
      if(response.data.allTests[i].test._id==id){
        setTests(response.data.allTests[i])
        console.log(response.data.allTests[i])
      } 
      setDataLen(response.data.allTests.length)
    }}


  useEffect(() => {
   getData()
  }, [])

  for(var i = 0;i<dataLen;i++){
    data.push({
      name:tests?.subjects[i]?.subject?.name,
      "Marks Obtained":tests?.subjects[i]?.marksObtained,
      "Total Marks":tests?.subjects[i]?.subject?.totalMarks
    })
    console.log(data,"Data")
  }

    console.log(data)


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
          {tests?.test?.name}
        </Text>
        <Text m="0.2rem" color="gray">
        {tests?.test?.date}
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
              {tests?.subjects?.length>0?tests?.subjects.map((subject)=>{
                return(
                  <td>{subject.subject.name}</td>
                )
              }):null
              }
            </tr>
            <tr>
              <th>Marks</th>
              {tests?.subjects?.length>0?tests?.subjects.map((subject)=>{
                return(
                  <td>{subject.marksObtained}/{subject.subject.totalMarks}</td>
                )
              }):null
              }
            </tr>
          </table>
          {/* <Button
            w="20%"
            p="0rem"
            backgroundColor="#4cc9f0"
            color="white"
            mt="1rem"
          >
            Download Report Card
          </Button> */}
        </Flex>
        <Flex flexWrap="wrap" w="100%" h="300px">
          <BarChart width={730} height={250} barSize={60} barGap={30} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Marks Obtained" fill="#8884d8" />
      <Bar dataKey="Total Marks" fill="#82ca9d" />
</BarChart>
        </Flex>
      </Flex>
    </Box>
  );
};
export default Test;
