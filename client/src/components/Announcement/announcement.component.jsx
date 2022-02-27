import React, { useEffect, useState } from "react";
import { Heading, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getAllAnnouncements } from "../../hooks/useClass";
import Fade from 'react-reveal/Fade';

const AnnouncementOverview = ({announcement}) => (
  <Fade left>
    <Box
    w="95%"
    boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
    m={12}
    p={4}
    borderRadius="5px"
    overflow="hidden"
  >
    <Heading as="h3" size="lg">
      {announcement.title}
    </Heading>
    <Text fontSize="xl" color="gray.500" py={2}>
      25 Febrauary, 2022
    </Text>
    <Text fontSize="xl" color="gray.800" py={4}>
      {announcement.description}
    </Text>
  </Box>
  </Fade>
);

export default function Anouncement() {
  const { user } = useSelector((state) => state.auth);
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    console.log(user);
    if (user?.class) {
      getAllAnnouncements(user?.class?._id).then((res) => {
        setAnnouncements(res);
      });
    }
  }, [user]);

  return (
    <div>
      <Heading as="h2" m={12} size="2xl" color="purple.600">
        ANNOUNCEMENT
      </Heading>
      {announcements.slice().reverse().map((a) => (
        <AnnouncementOverview announcement={a}/>
      ))}
 
    </div>
  );
}
