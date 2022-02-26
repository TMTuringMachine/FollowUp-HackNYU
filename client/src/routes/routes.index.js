import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { CircularProgress } from "@mui/material";

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
      element: <LandingPage />,
    },
    {
      path: "/teacher/signup",
      element: <TeacherSignup />,
    },
    {
      path: "/student/signup",
      element: <StudentSignup />,
    },
    {
      path: "/teacher/login",
      element: <TeacherLogin />,
    },
    {
      path: "/student/login",
      element: <StudentLogin />,
    },
    {
      path: "/chat",
      element: <Chatroom />,
    },
    {
      path: "/teacher",
      element: <TeacherLayout />,
      children: [
        {
          path: "test",
          element: <Test />,
        },
        {
          path: "classes",
          element: <TeacherClasses />,
        },

        {
          path: "class/attendance",
          element: <ClassAttendence />,
        },
        {
          path: "class/:id",
          element: <TeacherClass />,
        },
        {
          path: "class/:id/test",
          element: <TeacherTestMarks />,
        },
        {
          path: "class/:id/attendance",
          element: <TeacherAttendance />,
        },
      ],
    },
    {
      path: "/student",
      element: <StudentLayout />,
      children: [
        {
          path: "tests/:id",
          element: <Test />,
        },
        {
          path: "recentTests",
          element: <RecentTest />,
        },
        {
          path: "announcement",
          element: <Announcement />,
        },
        {
          path: "attendance",
          element: <Attendence />,
        },
        {
          path: "performance",
          element: <StudentPerformance />,
        },
        {
          path: "feedback",
          element: <Feedback />,
        },
      ],
    },
  ]);
}

//layouts
// const MainLayout = Loadable(
//   lazy(() => import("../layouts/mainLayout/mainLayout.component"))
// );
const Test = Loadable(
  lazy(() => import("../components/RecentTests/Test.component"))
);
const Announcement = Loadable(
  lazy(() => import("../components/Announcement/announcement.component"))
);
const Attendence = Loadable(
  lazy(() => import("../components/Attendence/attendence.component"))
);
const RecentTest = Loadable(
  lazy(() => import("../components/RecentTests/RecentTests"))
);
const StudentPerformance = Loadable(
  lazy(() => import("../pages/StudentPerformance"))
);
const TeacherSignup = Loadable(
  lazy(() => import("../pages/TeacherAuth/TeacherSIgnup"))
);
const StudentSignup = Loadable(
  lazy(() => import("../pages/StudentAuth/StudentSignup"))
);

const TeacherLogin = Loadable(
  lazy(() => import("../pages/TeacherAuth/TeacherLogin"))
);

const StudentLogin = Loadable(
  lazy(() => import("../pages/StudentAuth/StudentLogin"))
);

const Feedback = Loadable(
  lazy(() => import("../components/Feedback/feedback.components"))
);
const ClassAttendence = Loadable(
  lazy(() => import("../pages/ClassAttendence/ClassAttendence"))
);
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

const LandingPage = Loadable(
  lazy(() => import("../pages/LandingPage/landingpage.component"))
);
const TeacherLayout = Loadable(
  lazy(() => import("../layouts/teacherLayout/teacherLayout.component"))
);
const StudentLayout = Loadable(
  lazy(() => import("../layouts/studentLayout/studentLayout.component"))
);

//teacher dashboard pages
const TeacherClasses = Loadable(
  lazy(() => import("../pages/TeacherClasses/TeacherClasses.component"))
);

const TeacherClass = Loadable(
  lazy(() => import("../pages/TeacherClass/TeacherClass.component"))
);

const TeacherTestMarks = Loadable(
  lazy(() => import("../pages/TeacherTestMarks/teacherTestMarks.component"))
);

const TeacherAttendance = Loadable(
  lazy(() => import("../pages/TeacherAttendance/TeacherAttendence.component"))
);

const Chatroom = Loadable(lazy(() => import("../pages/Chatroom/Chatroom")));
