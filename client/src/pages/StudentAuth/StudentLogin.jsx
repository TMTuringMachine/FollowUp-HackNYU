import { Flex, Center, Spacer } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Signimg from "../../assets/images/Signimg.png";
import { Input } from "@chakra-ui/input";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@chakra-ui/button";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { LoginHandler } from "../../hooks/useAuth";
import AlertComponent from "../../components/Alert/Alert.component";
import { useSelector } from "react-redux";
const StudentLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    LoginHandler(data, dispatch, false).then((res) => {
      if (res.error) {
        setIsError(!isError);
        setErrorMessage(res.error);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      } else {
        navigate("/student/studentDashboard");
      }
    });
  };
  useLayoutEffect(() => {
    if (user.isLoggedIn) {
      if (user.user.qualification) {
        navigate("/teacher/classes");
      } else {
        navigate("/student/studentDashboard");
      }
    }
  });
  return (
    <>
      {isError && <AlertComponent title={errorMessage} />}
      <Flex>
        <ImageStyled className="left">
          <img className="leftImg" src={Signimg} alt="" />
        </ImageStyled>
        <Flex
          className="right"
          justifyContent="center"
          alignItems="center"
          direction="column"
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
            Login
          </Box>
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <label htmlFor="email">Email</label>
            <br />
            <Input
              mb="1rem"
              p="0.4rem"
              backgroundColor="#e6e6e6"
              id="email"
              name="email"
              type="text"
              w="20rem"
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
              type="password"
              w="20rem"
              borderRadius="5px"
              required
              name="password"
              onChange={(e) => onChangeHandler(e)}
            />
            <br />
            <Button
              onSubmit={(e) => onSubmitHandler(e)}
              width="100%"
              mt="1rem"
              backgroundColor="#6c63ff"
              color="white"
              type="submit"
            >
              Submit
            </Button>
          </form>
          <Box p="2rem 0rem" className="already">
            New to this?{" "}
            <span style={{ color: "#6c63ff", fontWeight: "800" }}>
              <Link to="/sign-in">Sign Up</Link>
            </span>
          </Box>
        </Flex>
      </Flex>
    </>
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

export default StudentLogin;
