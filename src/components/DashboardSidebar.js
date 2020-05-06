//React
import React from "react";
import PropTypes from "prop-types";

//Chakra UI
import { Box, Image } from "@chakra-ui/core";

//Assets
import Logo from "../assets/website-logo.svg";

//Redux
import { connect } from "react-redux";

const Dashboard = ({ user, elements }) => {
  return (
    <Box
      maxWidth={{ md: "18rem" }}
      textAlign="center"
      borderRightWidth="1px"
      height="100vh"
    >
      <Box
        borderBottomWidth="1px"
        textAlign="center"
        paddingY="10px"
        display={{ base: "none", md: "block" }}
      >
        <Image src={Logo} display="block" margin="auto" />
      </Box>
      <Box mt={{ base: "120px", md: "30px" }} textAlign="center">
        {elements.map(element => element)}
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  elements: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  user: state.user
});

export default connect(mapStatetoProps)(Dashboard);
