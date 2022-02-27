import { Box, Image, Text } from "@chakra-ui/react";
import React,{useState,useEffect} from "react";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styled from "styled-components";
import { ButtonBase } from "@mui/material";


const ImageContainer = styled("div")(({ url }) => ({
  width: "100%",
  height: "70%",
  backgroundImage: `url('${url}')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  "& p": {
    color: "white",
    fontSize: "2em",
    zIndex: 999,
    fontWeight: 800,
    margin: "10px 0 0 10px",
  },
}));

const images = [
  "https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
  "https://images.unsplash.com/photo-1493210977798-4f655ac200a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=952&q=80",
  "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1586672806791-3a67d24186c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1592845571343-2f08af4ba028?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
];

const ClassOverview = ({ classData }) => {
  const navigate = useNavigate();

  const [image,setImage] = useState("");

  useEffect(()=>{
    const item = images[Math.floor(Math.random()*images.length)];
    setImage(item);
  },[])

  return (
    <Fade bottom>
      <ButtonBase
        sx={{ width: "100%", height: "300px", textAlign: "start" }}
        onClick={() => {
          navigate(`/teacher/class/${classData?._id}`);
        }}
      >
        <Box
          height="100%"
          width="100%"
          boxShadow="0px 8px 20px rgba(35, 35, 35, 0.1)"
          borderRadius={5}
          overflow="hidden"
          transition="all 0.3s ease-in-out"
          _hover={{ transform: "translateY(-10px)" }}
          cursor="pointer"
        >
          {/* <Image
          src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1166&q=80"
          width="100%"
          height="70%"
        /> */}
          <ImageContainer url={image}>
            <p> {classData?.name}</p>
          </ImageContainer>
          <Text color="#888888" margin="5px 0px 0px 10px" fontSize="xl">
            {classData?.students?.length} students
          </Text>
          <Text color="#888888" margin="0px 0px 0px 10px" fontSize="xl">
            {classData?.subjects?.length} subjects
          </Text>

          {/* <Icon icon="ion:navigate-circle" color="#4CC9F0" fontSize="2em"/> */}
        </Box>
      </ButtonBase>
    </Fade>
  );
};

export default ClassOverview;
