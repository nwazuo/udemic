import React from "react";
import PropTypes from "prop-types";
//Chakra UI
import {
  Text,
  Heading,
  Box,
  Alert,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner
} from "@chakra-ui/core";

//Assets
import TopHeader from "../components/TopHeader";

//Google oauth utility
import { Login, Signup } from "../utils/ReactGoogleLogin";

//Redux
import { connect } from "react-redux";
import {
  loginUser,
  signupUser,
  getUserData
} from "../redux/actions/userActions";

const Signin = ({ loginUser, signupUser, UI, user, action }) => {
  const signupSuccessHandler = ({ userType, userData }) => {
    signupUser({ userType, userData });
  };
  const loginSuccessHandler = ({ userType, googleId }) => {
    loginUser({ userType, googleId });
  };

  return (
    <Box height="100vh">
      {UI.loading ? (
        <Box
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          background="rgba(255,255,255,0.7)"
        >
          <Spinner thickness="4px" size="xl" />
        </Box>
      ) : (
        ""
      )}
      <TopHeader />
      <Box
        marginX="auto"
        maxWidth={{ md: "36em", base: "90%" }}
        mt={{ md: "50px", base: "30px" }}
        borderWidth="1px"
        shadow="md"
        pb="30px"
      >
        <Tabs
          isFitted
          variant="enclosed"
          defaultIndex={action ? 0 : 1}
          rounded=""
        >
          <TabList>
            <Tab>SIGN UP</Tab>
            <Tab>SIGN IN</Tab>
          </TabList>
          <TabPanels>
            <TabPanel textAlign="center">
              <Text fontSize="3xl" fontWeight="semibold" mt="15px">
                Sign Up for Free
              </Text>
              <Text fontSize="md">
                Whether you are an instructor or student, <b>udemic</b> has got
                something for you! Sign up to get started
              </Text>
              <Box display={{ sm: "flex" }} mt="40px">
                <Box flexBasis={{ sm: "50%" }} mb={{ base: "20px" }}>
                  <Signup userType="student" success={signupSuccessHandler} />
                </Box>
                <Box flexBasis={{ sm: "50%" }}>
                  <Signup
                    userType="instructor"
                    success={signupSuccessHandler}
                  />
                </Box>
              </Box>
              <Text mt="20px">By clicking signup you agree to whatever...</Text>
            </TabPanel>
            <TabPanel textAlign="center">
              <Text fontSize="3xl" fontWeight="semibold" mt="15px">
                Sign in
              </Text>
              <Text fontSize="md" mb="30px">
                Log in to continue
              </Text>
              <Box display={{ sm: "flex" }}>
                <Box flexBasis={{ sm: "50%" }} mb={{ base: "20px" }}>
                  <Login userType="student" success={loginSuccessHandler} />
                </Box>
                <Box flexBasis={{ sm: "50%" }}>
                  <Login userType="instructor" success={loginSuccessHandler} />
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

Signin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser,
  signupUser
};

export default connect(mapStateToProps, mapActionsToProps)(Signin);
