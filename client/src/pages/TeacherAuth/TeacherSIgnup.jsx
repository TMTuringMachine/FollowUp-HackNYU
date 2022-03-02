import { Flex, Center, Spacer } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import Signimg from "../../assets/images/Signimg.png";
import { Input } from "@chakra-ui/input";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";
// import { useAlert } from "react-alert";

import { SignupHandler } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const TeacherSignup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    gender: null,
    qualification: "",
    password: "",
    cpassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //   const alert = useAlert();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    SignupHandler(data, dispatch, navigate, true);
  };
  return (
    <Flex>
      <ImageStyled className="left">
        <img className="leftImg" src={Signimg} alt="" />
      </ImageStyled>
      <Flex
        className="right"
        justifyContent="center"
        alignItems="center"
        direction="column"
        // backgroundColor="red"
        flexBasis={{ base: "100%", md: "50%" }}
      >
        <Box
          fontSize={{ base: "1.8rem", md: "2.8rem", sm: "1.8rem" }}
          fontWeight="bold"
          textAlign="center"
          className="head"
          p="1rem"
          pt={{ base: "4rem", md: "0" }}
        >
          Create an account
        </Box>
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <label htmlFor="name">Name</label>
          <br />
          <Input
            backgroundColor="#e6e6e6"
            id="name"
            name="name"
            type="text"
            required
            mb="1rem"
            p="0.4rem"
            w="20rem"
            borderRadius="5px"
            onChange={(e) => onChangeHandler(e)}
          />
          <br />

          <label htmlFor="email">Email</label>
          <br />
          <Input
            mb="1rem"
            p="0.4rem"
            backgroundColor="#e6e6e6"
            id="email"
            w="20rem"
            borderRadius="5px"
            required
            name="email"
            onChange={(e) => onChangeHandler(e)}
            type="email"
          />
          <br />
          <label htmlFor="gender">Gender</label>
          <br />
          <Input
            mb="1rem"
            p="0.4rem"
            backgroundColor="#e6e6e6"
            id="phone"
            w="20rem"
            name="gender"
            borderRadius="5px"
            required
            onChange={(e) => onChangeHandler(e)}
          />
          <br />
          <label htmlFor="qualification">Qualification</label>
          <br />
          <Input
            mb="1rem"
            p="0.4rem"
            backgroundColor="#e6e6e6"
            id="phone"
            w="20rem"
            name="qualification"
            borderRadius="5px"
            required
            onChange={(e) => onChangeHandler(e)}
          />
          <br />
          <label htmlFor="pass">Password</label>
          <br />
          <Input
            mb="1rem"
            p="0.4rem"
            backgroundColor="#e6e6e6"
            id="pass"
            w="20rem"
            borderRadius="5px"
            required
            name="password"
            onChange={(e) => onChangeHandler(e)}
            type="password"
          />
          <br />
          <label htmlFor="cpass">Confirm Password</label>
          <br />
          <Input
            mb="1rem"
            p="0.4rem"
            backgroundColor="#e6e6e6"
            id="cpass"
            w="20rem"
            borderRadius="5px"
            name="cpassword"
            required
            onChange={(e) => onChangeHandler(e)}
            type="password"
          />
          <br />
          <Button
            onSubmit={(e) => onSubmitHandler(e)}
            width="100%"
            mt="1rem"
            backgroundColor="#6c63ff"
            color="white"
            type="submit"
            _hover={{ bg: "#a6a0ff" }}
          >
            Submit
          </Button>
        </form>
        <Box p="2rem 0rem" className="already">
          Already have an account ?{" "}
          <span style={{ color: "#6c63ff", fontWeight: "800" }}>
            <Link to="/teacher/login">Login</Link>
          </span>
        </Box>
      </Flex>
    </Flex>
  );
};

const ImageStyled = styled.div`
  img {
    width: 40rem;
    height: 100vh;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default TeacherSignup;
