import React from "react";
import { Heading, Divider, Text, Grid, Center } from "@chakra-ui/react";
import { PieChart, Pie } from "recharts";

const data01 = [
  {
    name: "Present",
    value: 60,
  },
  {
    name: "Abesnt",
    value: 40,
  },
];

export default function Attendence() {
  return (
    <div>
      <Heading as="h2" m={12} size="2xl" color="purple.600">
        ATTENDENCE
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} m={4}>
        <Text m={12} fontSize="6xl">
          68%
        </Text>
        <div>
          <PieChart width={300} height={300}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              radius={50}
              fill="#8884d8"
              label
            />
          </PieChart>
        </div>
      </Grid>
      <Center>
        <Grid templateColumns="repeat(2, 1fr)" gap={6} m={4}>
          <Grid mx={16}>
            <Text fontSize="4xl">Date</Text>
            <Text fontSize="2xl">24 Feb, 2022</Text>
            <Divider />
            <Text fontSize="2xl">23 Feb, 2022</Text>
            <Divider />
            <Text fontSize="2xl">22 Feb, 2022</Text>
            <Divider />
            <Text fontSize="2xl">21 Feb, 2022</Text>
            <Divider />
          </Grid>
          <Grid>
            <Text fontSize="4xl">Status</Text>
            <Text fontSize="2xl" color="green.500">
              P
            </Text>
            <Divider />
            <Text fontSize="2xl" color="red.500">
              A
            </Text>
            <Divider />
            <Text fontSize="2xl" color="green.500">
              P
            </Text>
            <Divider />
            <Text fontSize="2xl" color="green.500">
              P
            </Text>
            <Divider />
          </Grid>
        </Grid>
      </Center>
    </div>
  );
}
