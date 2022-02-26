import React, { useState } from "react";

//components
import IconButton from "../icon-button/icon-button.component";

//libs
import { Icon } from "@iconify/react";
import { Avatar, useTheme, Rating, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

//styled
import {
  SidebarContainer,
  SidebarDrawer,
  MainSidebar,
  SidebarBtnContainer,
  LogoutBtn,
} from "./sidebar.styles";

const SidebarBtn = ({ url, children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarBtnContainer
      selected={pathname === url}
      onClick={() => {
        navigate(url);
      }}
    >
      {children}
    </SidebarBtnContainer>
  );
};

const Sidebar = ({ toggleScreenState }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    profilePic: "https://www.nawpic.com/media/2020/levi-ackerman-nawpic-38.jpg",
    username: "Levi_2910",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    toggleScreenState();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <SidebarContainer theme={theme}>
      {user === null ? (
        <div>loading ...</div>
      ) : (
        <>
          <IconButton onClick={toggleSidebar}>
            <Icon icon="ci:menu-alt-03" fontSize={"2em"} color={"#6C63FF"} />
          </IconButton>
          <SidebarDrawer
            open={isSidebarOpen}
            anchor="left"
            onOpen={toggleSidebar}
          >
            <MainSidebar>
              <Icon
                icon="eva:close-circle-outline"
                className="close-icon"
                onClick={toggleSidebar}
              />
              <div className="user-info">
                <Avatar />
                <div className="username">FirstName LastName</div>
              </div>
              <div className="sidebar-btns">
                <SidebarBtn url="/home">ALL COURSES</SidebarBtn>
                <SidebarBtn url="/myCourses">MY COURSES</SidebarBtn>
                <SidebarBtn url="/">MY WISHLIST</SidebarBtn>
                <SidebarBtn url="/myTeachings">MY TEACHINGS</SidebarBtn>
              </div>
              <br />
              <LogoutBtn onClick={e => handleLogout()}>
                {" "}
                <Icon icon="ri:logout-box-line" color="#000" />
                LOGOUT
              </LogoutBtn>
            </MainSidebar>
          </SidebarDrawer>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
