import React, { useState } from "react";
import {
  Heading,
  Text,
  Flex,
  Textarea,
  Button,
  ButtonGroup,
  Box,
} from "@chakra-ui/react";
import { Rating } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { useNavigate } from "react-router-dom";
import giveFeedback from "../../hooks/useClass";
import { useSelector } from "react-redux";
export default function Feedback() {
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: "Very Satisfied",
    },
  };

  // const valueIcons = {
  //   "Very Dissatisfied": 1,
  //   Dissatisfied: 2,
  //   Neutral: 3,
  //   Satisfied: 4,
  //   "Very Satisfied": 5,
  // };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  const [value, setValue] = useState(4);
  const [hover, setHover] = useState(-1);
  const currClass = useSelector((store) => store.auth.user.class);
  const [data, setData] = useState({
    rating: value,
    text: "",
    class_id: currClass,
  });
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setData({ ...data, text: e.target.value });
  };
  const onSubmitHandler = () => {
    data.rating = value;
    giveFeedback(data, navigate);
    console.log(data);
  };
  return (
    <div>
      <Heading as="h2" ml={12} my={8} size="2xl" color="purple.600">
        FEEDBACK
      </Heading>
      <Text fontSize="2xl" ml={12} my={4}>
        Write your feedback/review for the teachers.
      </Text>
      <Rating
        name="highlight-selected-only"
        value={value}
        defaultValue={4}
        IconContainerComponent={IconContainer}
        highlightSelectedOnly
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && (
        <Box>{customIcons[hover !== -1 ? hover : value].label}</Box>
      )}
      <Textarea
        ml={12}
        my={6}
        width="90%"
        minHeight="30vh"
        placeholder="Type your feedback here..."
        borderWidth="2px"
        borderColor="gray.800"
        onChange={(e) => onChangeHandler(e)}
      />
      <Flex ml={12}>
        <Button onClick={onSubmitHandler} colorScheme="blue">
          Send Feedback
        </Button>
      </Flex>
    </div>
  );
}
