import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { useSelector } from "react-redux";

import { getAllTests } from "../hooks/useClass";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const CustomizedLabel = (props) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-25)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const StudentPerformance = () => {
  const [tests, setTests] = useState([]);
  const [graphData, setGraphData] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(user);
    if (user._id) {
      getAllTests(user._id).then((res) => {
        setTests(res);
      });
    }
  }, [user]);

  useEffect(() => {
    if (tests.length) {
      const nd = tests.map((t) => ({
        name: t?.test?.name,
        score: Math.floor(
          (t?.subjects.reduce((acc, curr) => curr.marksObtained + acc, 0) /
            t?.subjects.reduce(
              (acc, curr) => acc + curr.subject.totalMarks,
              0
            )) *
            100
        ),
      }));

      setGraphData([...nd]);

      console.log(nd);
    }
  }, [tests]);

  return (
    <Flex justifyContent="center" alignItems="center" flexDir="column">
      <Text
        fontWeight="800"
        fontSize={{ base: "1rem", md: "3.2rem" }}
        color="#a18bd4"
      >
        Student Performance
      </Text>
      <Flex justifyContent="center" alignItems="center" mt="2rem" w="100%" paddingBottom="30px">
        <LineChart
          width={1000}
          height={400}
          data={graphData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" height={10} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={3}>
            <LabelList content={<CustomizedLabel />} />
          </Line>
        </LineChart>
      </Flex>
    </Flex>
  );
};
export default StudentPerformance;
