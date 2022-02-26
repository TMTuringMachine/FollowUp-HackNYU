import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/close-button";
const AlertComponent = (props) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{props.title}</AlertTitle>
    </Alert>
  );
};
export default AlertComponent;
