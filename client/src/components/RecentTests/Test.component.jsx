import { Flex, Text, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import shadows from "../../theme/shadows";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
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
  return (
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
        {/* <table style={{ width: "80%" }}>
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
        </table> */}
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
      <Box backgroundColor="red" w="100%" h="300px">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data01}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
            />
            <Pie
              data={data02}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <br />
      <br />
      <br />
      <br />
    </Flex>
  );
};
export default Test;
