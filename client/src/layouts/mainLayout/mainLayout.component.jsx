import React, { useState } from "react";

import { Outlet } from "react-router-dom";

import Header from "../../components/header/header.component";
// import { useSelector } from "react-redux";
import { Page, Content } from "./mainLayout.styles";

// import { useNavigate, useLocation } from "react-router-dom";

export const Context = React.createContext({});

const MainLayout = () => {
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

        <Header />
        <Content>
          <Outlet />
        </Content>
      </Context.Provider>
    </Page>
  );
};

export default MainLayout;
