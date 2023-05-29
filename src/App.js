import React from "react";
import Layout from "./pages/layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthContextProvider from "./context/AuthContext";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Test from "./Test";
import DropZoneImage from "./pages/utils/DropZoneImage";
import Invoice from "./pages/utils/Invoice";
const theme = createTheme({
  palette: {
    primary: {
      // main: "#21618C",
      main: "#0A2647",
      contrastText: "#fff",
    },
    info: {
      main: "#205295",
      // main: "#0E6251",
      contrastText: "#fff",
    },
    error: {
      main: "#F91351",
      contrastText: "#fff",
    },
  },
  typography: {
    h1: {
      [createTheme().breakpoints.down("xl")]: {
        fontSize: "4rem",
      },
    },
    h4: {
      [createTheme().breakpoints.down("xl")]: {
        fontSize: "1.75rem",
      },
    },
  },
});
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div>
      {/* <div style={{ maxWidth: "1366px", margin: "auto" }}> */}

      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          TransitionComponent={Slide}
        >
          <BrowserRouter>
            <AuthContextProvider>
              <Layout />

              {/* <Invoice /> */}
              {/* <DropZoneImage /> */}
              {/* <Test /> */}
            </AuthContextProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
