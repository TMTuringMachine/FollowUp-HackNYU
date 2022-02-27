import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUser } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function JwtProvider({ children }) {
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    initializeUser(dispatch);
  }, []);
  

  useEffect(() => {
    var token = null;
    var url = window.location.href;
    if (url.includes("/teacher/")) {
      token = localStorage.getItem("teacherToken");
      if (!token) navigate(`/teacher/login`);
    }

    if (url.includes("/student/")) {
      token = localStorage.getItem("studentToken");
      if (!token) navigate(`/student/login`);
    }
  }, []);

  return <>{children}</>;
}
