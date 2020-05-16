//This component intercepts a route request to any page that is protected and redirects appropriately

//React
import React from "react";

//Redux Stuff
import { connect } from "react-redux";
import { logoutUser, getUserData } from "../redux/actions/userActions";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../redux/types";
import store from "../redux/store";

//Reach Router
import { Router } from "@reach/router";

const AuthPage = ({ page, videoId }) => {
  console.log("I came here");
  let isLoggedIn = localStorage.googleId; //Google ID acts as a form of authentication token(very unsafe thing to do)
  let expired = localStorage.sessionExpires;
  let userType = localStorage.userType;

  if (isLoggedIn) {
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(getUserData({ userType, googleId: isLoggedIn }));
    //render provided page
    if (videoId) {
      return page(videoId);
    } else return page();
  } else {
    store.dispatch(logoutUser());
    return <h1>KiKI</h1>;
  }
};

export default AuthPage;
