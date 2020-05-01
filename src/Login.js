import React from "react";
import GoogleLogin from "react-google-login";

const Login = ({ responseGoogle, responseGoogleError }) => {
  return (
    <div>
      <GoogleLogin
        clientId="568466913428-r690e5d5qtetru6v3kueulbcd2j47i60.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogleError}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
