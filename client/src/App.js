import "./App.css";
import Router from "./routes/routes.index";
import ThemeConfig from "./theme/theme";
import { useTheme } from "@mui/material";
import { ChakraProvider } from "@chakra-ui/react";


// import JwtProvider from "./providers/jwtProvider";


function App() {
  const theme = useTheme();
  return (
    <ThemeConfig>
      <div className="App" theme={theme}>
        {/* <JwtProvider> */}
        <ChakraProvider>
          <Router />
        </ChakraProvider>
        {/* </JwtProvider> */}
      </div>
    </ThemeConfig>
  );
}

export default App;
