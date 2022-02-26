import React, { useState } from "react";

import { Outlet } from "react-router-dom";

import StudentHeader from "../../components/header/studentHeader.component";
// import Header from "../../components/header/header.component";
// import { useSelector } from "react-redux";
import { Page, Content } from "./studentLayout.styles";

// import { useNavigate, useLocation } from "react-router-dom";

export const Context = React.createContext({});

const StudentLayout = () => {
  const [isFullScreen, setIsFullScreen] = useState(true);
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
      <Context.Provider value={{ isFullScreen }}>
        {/* <Sidebar
          toggleScreenState={() => {
            setIsFullScreen(!isFullScreen);
          }}
        /> */}

        <StudentHeader />
        <Content>
          <Outlet />
        </Content>
      </Context.Provider>
    </Page>
  );
};

export default StudentLayout;