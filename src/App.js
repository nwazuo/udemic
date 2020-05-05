import React from "react";
import "./App.css";

//Chakra UI Component Library (uses emotion CSS-in-JS)
import { CSSReset, theme } from "@chakra-ui/core";
import { ThemeProvider } from "emotion-theming";

//Reach Router
import { Router } from "@reach/router";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Pages
import Signin from "./pages/signin";
import Home from "./pages/home";
import Dashboard from "./pages/student/dashboard";

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CSSReset />
          <Router>
            <Home path="/" />
            <Signin path="/signin" />
            <Dashboard path="/student/dashboard" />
          </Router>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
