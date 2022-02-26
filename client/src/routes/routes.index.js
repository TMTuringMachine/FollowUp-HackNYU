import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import RecentTest from "../components/RecentTests/RecentTests";

const Loadable = (Component) => (props) => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          sx={{
            ...{
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            },
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // {
    //   path: "/sign-in",
    //   element: <SignIn />,
    // },
    // {
    //   path: "/landing",
    //   element: <Landing />,
    // },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/home",
          element: <Test />,
        },

        // {
        //   path: "/home",
        //   element: <Home />,
        // },
        // {
        //   path: "/test",
        //   element: <Test />,
        // },
      ],
    },
  ]);
}

//layouts
const MainLayout = Loadable(
  lazy(() => import("../layouts/mainLayout/mainLayout.component"))
);
const Test = Loadable(lazy(() => import("../components/Test/test.component")));
//pages
// const SignIn = Loadable(
//   lazy(() => import("../pages/sign-in/sign-in.componsnt"))
// );

// const Home = Loadable(
//   lazy(() => import("../pages/Homepage/homepage.component"))
// );
// const Test = Loadable(lazy(() => import("../pages/test")));
// const Login = Loadable(lazy(() => import("../pages/login/login.component")));
// const AdminLogin = Loadable(
//   lazy(() => import("../pages/login/loginAdmin.component"))
// );
