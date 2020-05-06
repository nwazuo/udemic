import {
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LOADING_UI,
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS
} from "../types";
import axios from "axios";
import { navigate } from "@reach/router";

export const loginUser = ({ userType, googleId }) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/${userType}?googleId=${googleId}`)
    .then(res => {
      setAuthenticated(googleId, userType, Date.now() + 604800);
      dispatch(getUserData({ userType, googleId }));
      dispatch({ type: CLEAR_ERRORS });
      //NAVIGATE code for reach router
      navigate(`/${userType}/dashboard`);
    })
    .catch(err => {
      console.log({ err });
      const { message } = err;
      const errObj = {
        general: "Something went wrong, Try again!",
        message
      };
      dispatch({
        type: SET_ERRORS,
        payload: errObj
      });
    });
};

export const signupUser = ({ userType, userData }) => dispatch => {
  //Pesky error that allows user sign up more than once
  dispatch({ type: LOADING_UI });
  axios
    .post(`/${userType}`, userData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log("axios :", res);
      setAuthenticated(res.data.googleId, userType, Date.now() + 604800);
      dispatch(getUserData({ userType, googleId: res.data.googleId }));
      dispatch({ type: CLEAR_ERRORS });
      navigate(`/${userType}/dashboard`);
    })
    .catch(err => {
      console.log(err);
      const { message } = err;
      const errObj = {
        general: "Something went wrong, Try again!",
        message
      };
      dispatch({
        type: SET_ERRORS,
        payload: err.Obj
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("googleId");
  localStorage.removeItem("userType");
  localStorage.removeItem("sessionExpires");
  dispatch({ type: SET_UNAUTHENTICATED });
  navigate("/signin");
};

export const getUserData = ({ userType, googleId }) => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get(`/${userType}?googleId=${googleId}`)
    .then(res => {
      dispatch({ type: SET_USER, payload: res.data });
    })
    .catch(err => console.log(err));
};

//loads (very insecure) data to localstorage for storing relogin sessions
const setAuthenticated = (googleId, userType, sessionExpires) => {
  localStorage.setItem("googleId", googleId);
  localStorage.setItem("userType", userType);
  localStorage.setItem("sessionExpires", sessionExpires);
};
