import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUser } from "../hooks/useAuth";


// ----------------------------------------------------------------------

export default function JwtProvider({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    initializeUser(dispatch);
  }, []);
  

  return <>{children}</>;
}
