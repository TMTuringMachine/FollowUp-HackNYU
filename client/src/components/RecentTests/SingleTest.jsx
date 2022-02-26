import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import shadows from "../../theme/shadows";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
const SingleTest = ({props}) => {
  const navigate = useNavigate();
  const user = useSelector((store)=>store.auth.user)
  return (
    <Flex
      p="0.8rem 6rem 0.8rem 0.8rem"
      m="1rem"
      flexDir="column"
      justifyContent="center"
      alignItems="flex-start"
      boxShadow={shadows.shadow3}
    >
      <Text fontSize="2.2rem" fontWeight="700">
      {props?.test?.name}
      </Text>
      <Text m="0.2rem" color="gray">
      {props?.test?.date}
      </Text>
      <Button
        p="0rem"
        w="100%"
        backgroundColor="#4cc9f0"
        color="white"
        mt="1rem"
        onClick={()=>{
          navigate(`/student/tests/${props?.test?._id}`);
        }}
      >
        View
      </Button>
    </Flex>
  );
};
export default SingleTest;
