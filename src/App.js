import React from "react";
import "./App.css";

//Chakra UI Component Library (uses emotion CSS-in-JS)
import { CSSReset, theme } from "@chakra-ui/core";
import { ThemeProvider } from "emotion-theming";

//Reach Router
import { Router } from "@reach/router";

//Cloudinary
import { CloudinaryContext } from "cloudinary-react";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Pages
import Signin from "./pages/signin";
import Home from "./pages/home";
import Video from "./pages/video";

//Components
import StudentDashboard from "./pages/student";
import InstructorDashboard from "./pages/instructor";
import AuthPage from "./components/AuthPage";

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CloudinaryContext cloudName="udemic" uploadPreset="sample">
            <CSSReset />
            <Router>
              <Signin path="/" />
              <Signin path="/signin/:action" />
              {/* funny implementation of a signup route*/}
              <Signin path="/signin" />
              <AuthPage path="/student/*" page={() => <StudentDashboard />} />
              <AuthPage
                path="instructor/*"
                page={() => <InstructorDashboard />}
              />
              <AuthPage
                path="/video/:videoId"
                page={videoId => <Video videoId={videoId} />}
              />
            </Router>
          </CloudinaryContext>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
