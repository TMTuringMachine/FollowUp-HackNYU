import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { CreateProfileHook } from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const CreateProfile = () => {
  const [data, setData] = useState({
    education: "",
    DateOfBirth: "",

    age: null,
    gender: "",
    address: "",
    image: "",
  });
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const imageHandler = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dx1ye2bro`,
        uploadPreset: `kp2gvmnk`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setData({ ...data, image: result.info.url });
        }
      }
    );
    widget.open();
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    CreateProfileHook(data, dispatch, navigate);
  };

  return (
    <Flex mt="1.5rem" justifyContent="center" alignItems="center">
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <label htmlFor="">Highest Education</label>
        <br />
        <Input
          mb="1rem"
          p="0.4rem"
          backgroundColor="#e6e6e6"
          id="pass"
          w="30rem"
          borderRadius="5px"
          required
          name="education"
          onChange={(e) => onChangeHandler(e)}
          type="text"
        />
        <br />
        <label htmlFor="">Age</label>
        <br />
        <Input
          mb="1rem"
          p="0.4rem"
          backgroundColor="#e6e6e6"
          id="pass"
          w="30rem"
          borderRadius="5px"
          name="age"
          required
          onChange={(e) => onChangeHandler(e)}
          type="number"
          min="6"
        />
        <br />
        <label htmlFor="">Gender</label>
        <br />
        <Input
          mb="1rem"
          p="0.4rem"
          backgroundColor="#e6e6e6"
          id="pass"
          w="30rem"
          name="gender"
          borderRadius="5px"
          required
          onChange={(e) => onChangeHandler(e)}
          type="text"
        />
        <br />
        <label htmlFor="">Date of Birth</label>
        <br />
        <Input
          mb="1rem"
          p="0.4rem"
          backgroundColor="#e6e6e6"
          id="pass"
          w="30rem"
          name="DateOfBirth"
          borderRadius="5px"
          required
          onChange={(e) => onChangeHandler(e)}
          type="date"
        />
        <br />
        <label htmlFor="">Address</label>
        <br />
        <Input
          mb="1rem"
          p="0.4rem"
          backgroundColor="#e6e6e6"
          id="pass"
          w="30rem"
          name="address"
          borderRadius="5px"
          required
          onChange={(e) => onChangeHandler(e)}
          type="text"
        />
        <br />
        <label htmlFor="">Profile Picture</label>
        <br />
        <Button onClick={imageHandler}>Upload Image</Button>
        <Button
          mt="1rem"
          backgroundColor="#6c63ff"
          color="white"
          type="submit"
          w="100%"
          onSubmit={(e) => onSubmitHandler(e)}
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
};
export default CreateProfile;
