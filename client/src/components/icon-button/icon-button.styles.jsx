import { Button, styled } from "@mui/material";

export const IconButtonContainer = styled(Button)(({ theme }) => ({
  // width:'30px',
  height: "50px",
  // maxWidth: "20px",
  minWidth:'35px',
  padding: "0px !important",
  // backgroundColor:"#6C63FF",
  backgroundColor: "#fff",
  boxShadow: "0px 8px 20px rgba(35, 35, 35, 0.1)",
  color: "black",
  // margin:'5px 20px',
  position: "absolute",
  left: "0px",
  top: "calc(50vh - 25px)",
  borderRadius: "0px 5px 5px 0px",
  zIndex: 99999,

  "&:hover": {
    backgroundColor: "#fff",
  },
  "& svg": {
    width: "25px",
    height: "25px",
  },
}));
