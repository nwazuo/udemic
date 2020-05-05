import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import signin from "./pages/signin";
//Chakra UI component library (uses emotion as a dependency)
import { CSSReset, theme } from "@chakra-ui/core";
import { ThemeProvider } from "emotion-theming";

//Reach Router
import { Router } from "@reach/router";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
