import React from "react";
import { Heading, Divider, Text, Grid, GridItem } from "@chakra-ui/react";
import {PieChart, Pie} from "recharts";

const data01 = [
  {
    name: "Present",
    value: 60,
  },
  {
    name: "Abesnt",
    value: 40,
  }
];

export default function Attendence() {
  return (
    <div>
      <Heading as="h2" size="2xl">
        Attendence
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} m={4}>
        <Text fontSize="6xl">68%</Text>
        <div>
          <PieChart width={300} height={300}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              radius={50}
              fill="#8884d8" label 
            />
          </PieChart>
        </div>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} m={4}>
        <div>
          <Text fontSize="4xl">Date</Text>
          <Text fontSize="2xl">24 Feb, 2022</Text>
          <Divider />
          <Text fontSize="2xl">23 Feb, 2022</Text>
          <Divider />
          <Text fontSize="2xl">22 Feb, 2022</Text>
          <Divider />
          <Text fontSize="2xl">21 Feb, 2022</Text>
          <Divider />
        </div>
        <div>
          <Text fontSize="4xl">Status</Text>
          <Text fontSize="2xl">P</Text>
          <Divider />
          <Text fontSize="2xl">A</Text>
          <Divider />
          <Text fontSize="2xl">P</Text>
          <Divider />
          <Text fontSize="2xl">P</Text>
          <Divider />
        </div>
      </Grid>
    </div>
  );
}
