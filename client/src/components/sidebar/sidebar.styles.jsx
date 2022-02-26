import { styled, Drawer, Button } from "@mui/material";

export const SidebarContainer = styled("div")(() => ({
  width: "fit-content",
  height: "fit-content",
  position: "fixed",
}));

export const SidebarDrawer = styled(Drawer)(({ theme }) => ({
  backgroundColor: "transparent",
  height: "90vh",
  width: "fit-content",

  "& .MuiBackdrop-root": {
    background: "none",
    backgroundColor: "transparent",
    filter: "brightness(80%)",
    width: "fit-content",
  },

  "& .MuiPaper-root": {
    height: "96vh",
    width: "20vw",
    margin: "2vh 0 2vh 20px",
    backgroundColor: theme.palette.colors.background1,
    overflowX: "hidden",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows.shadow3,
  },
  [theme.breakpoints.down('sm')]:{
    "& .MuiPaper-root":{
      width:"80vw",
    }
  }
}));

export const MainSidebar = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "10px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  "& .close-icon": {
    position: "absolute",
    top: "10px",
    left: "10px",
    fontSize: "2em",
    color: "#6C63FF",
    cursor: "pointer",
  },

  "& .MuiAvatar-root ": {
    width: "180px",
    height: "180px",
    marginTop: "20px",
  },

  "& .sidebar-btns": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  "& .user-info": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "& .username": {
      fontSize: "1.4em",
      fontWeight: 500,
      color: "black",
    },
  },
}));

export const SidebarBtnContainer = styled(Button)(({ theme, selected }) => ({
  width: "70%",
  height: "fit-content",
  //   ...theme.palette.textGradients.txtGrad1,
  color: selected ? "white" : "black",
  borderRadius: 5,
  margin: "10px 0",
  fontSize: "1.1em",
  padding: "3px",
  fontWeight: selected ? 800 : 500,
  backgroundColor: selected ? "#6C63FF" : "white",
  letterSpacing: 2,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: selected ? "#6C63FF" : "white",
    color: selected ? "white" : "black",
  },
}));

export const LogoutBtn = styled(Button)(({ theme }) => ({
  width: "70%",
  height: "fit-content",
  boxShadow: theme.shadows.shadow1,
  backgroundColor: "white",
  padding: "10px",
  fontWeight: 600,
  letterSpacing: 2,
  color: "black",

//   ...theme.palette.textGradients.txtGrad1,
  "& svg": {
    marginRight: 10,
  },
}));
