import React, { useEffect, useState } from "react";
import {
  Heading,
  Divider,
  Text,
  Flex,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import { PieChart, Pie } from "recharts";
import { getAttendance } from "../../hooks/useClass";
import { useSelector } from "react-redux";
import shadows from "../../theme/shadows";

import { useSnackbar } from "notistack";
import moment from "moment";

export default function Attendence() {
  const [data, setData] = useState([]);
  const [attendance, setAttendance] = useState([]);

  let [total, setTotal] = useState(0);
  let [present, setPresent] = useState(0);
  const user = useSelector((store) => store.auth.user);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    getAttendance(user._id).then((res) => {
      enqueueSnackbar("Attendance recieved", {
        variant: "success",
      });
      setAttendance(res);
    });
  }, []);
  useEffect(() => {
    attendance.forEach(async (atte) => {
      total = total + 1;
      setTotal(total);
      if (atte.isPresent) {
        present = present + 1;
        setPresent(present);
      }
    });
    setData([
      {
        name: "present",
        value: Math.ceil((present / total) * 100),
      },
      {
        name: "absent",
        value: Math.floor(((total - present) / total) * 100),
      },
    ]);
  }, [attendance]);
  console.log(data);
  return (
    <Flex justifyContent="flex-start" alignItems="flex-start" flexDir="column">
      <Heading as="h2" m={12} size="2xl" color="purple.600">
        ATTENDANCE
      </Heading>
      <Flex w="100%" justifyContent="space-around" alignItems="center">
        <Flex
          boxShadow={shadows.shadow2}
          p="2rem"
          borderRadius="20px"
          justifyContent="center"
          alignItems="center"
          m={12}
          fontSize="6xl"
        >
          {Math.ceil((present / total) * 100) == NaN
            ? "0%"
            : Math.ceil((present / total) * 100)}
          %
        </Flex>
        <div>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
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
        <Center>
          <Table variant="striped" ml="2rem">
            <Thead>
              <Tr>
                <Th fontSize="2rem" fontWeight="800">
                  Date
                </Th>
                <Th fontSize="2rem" fontWeight="800">
                  Attendance
                </Th>
              </Tr>
            </Thead>

            {attendance.map((atte) => {
              return (
                <Tr fontSize="1rem">
                  <Td>{moment(atte.date).format("DD-MM-YYYY")}</Td>
                  <Td fontSize="1.4rem" fontWeight="800">
                    {atte.isPresent ? (
                      <Text color="green.800">P</Text>
                    ) : (
                      <Text color="red.800">A</Text>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Table>
        </Center>
      </Flex>
    </Flex>
  );
}
