import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

export const Login = ({ userType, success, failure }) => {
  let userTypeDisplay = userType[0].toUpperCase() + userType.slice(1); //First letter uppercase for display
  const successCallback = response => {
    console.log(response);
    success({ userType, googleId: response.googleId });
  };

  return (
    <GoogleLogin
      clientId="568466913428-r690e5d5qtetru6v3kueulbcd2j47i60.apps.googleusercontent.com"
      buttonText={`${userTypeDisplay} Login`}
      onSuccess={successCallback}
      // onFailure={failureCallback}
    />
  );
};

export const Signup = ({ userType, success, failure }) => {
  let userTypeDisplay = userType[0].toUpperCase() + userType.slice(1); //First letter uppercase for display

  const successCallback = response => {
    let userData;
    const {
      email,
      googleId,
      imageUrl,
      familyName,
      givenName
    } = response.profileObj;
    if (userType === "student") {
      userData = {
        email,
        googleId,
        imageUrl,
        lastName: familyName,
        firstName: givenName,
        starred: [],
        favorites: []
      };
    } else if (userType === "instructor") {
      userData = {
        email,
        googleId,
        imageUrl,
        lastName: familyName,
        firstName: givenName,
        bio:
          "If you care about bio's then the feature to edit them is coming soon"
      };
    }
    success({ userType, userData });
  };

  return (
    <GoogleLogin
      clientId="568466913428-r690e5d5qtetru6v3kueulbcd2j47i60.apps.googleusercontent.com"
      buttonText={`${userTypeDisplay} Signup`}
      onSuccess={successCallback}
      // onFailure={failureCallback}
    />
  );
};
