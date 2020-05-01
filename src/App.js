import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { Text } from "@chakra-ui/core";
import { openUploadWidget } from "./utils/CloudinaryService";

let loginStatus;

const googleResponse = async response => {
  loginStatus = await response;
  console.log(loginStatus);
};

function App() {
  const openCloudinaryWidget = () => {
    openUploadWidget(
      { cloudName: "udemic", uploadPreset: "sample" },
      (error, result) => {
        if (!error) {
          console.log(result);
        } else {
          console.log(error);
        }
      }
    );
  };

  return (
    <div className="App">
      <Login responseGoogle={googleResponse} />
      <div>
        <button onClick={openCloudinaryWidget}>Open Cloudinary Widget</button>
      </div>
      <Authenticate />
    </div>
  );
}

function Authenticate() {
  const [status, setStatus] = useState(null);

  useEffect(() => {});

  if (status === null) {
    return (
      <Text fontSize="4xl" fontWeight="bold">
        Loading...
      </Text>
    );
  }

  return (
    <Text fontSize="4xl" fontWeight="bold">
      {status}
    </Text>
  );
}

export default App;
