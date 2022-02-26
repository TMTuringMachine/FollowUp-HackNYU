import React, { useState } from "react";

import { Outlet } from "react-router-dom";

// import Header from "../../components/header/header.component";
import TeacherHeader from "../../components/header/teacherHeader.component";
// import { useSelector } from "react-redux";
import { Page, Content } from "./teacherLayout.styles";

// import { useNavigate, useLocation } from "react-router-dom";

export const Context = React.createContext({});

const TeacherLayout = () => {
  //   const [isFullScreen, setIsFullScreen] = useState(true);
  // const { isLoggedIn } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  // const { pathname } = useLocation();

  // React.useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/landing");
  //   } else {
  //     if (pathname === "/") {
  //       navigate("/home");
  //     } else {
  //       navigate(pathname);
  //     }
  //   }
  // }, [isLoggedIn]);

  return (
    <Page>
      <TeacherHeader />
      <Content>
        <Outlet />
      </Content>
    </Page>
  );
};

export default TeacherLayout;
