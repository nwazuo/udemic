//React
import React from "react";
import PropTypes from "prop-types";

//Chakra UI
import { Box, Image } from "@chakra-ui/core";

//Assets
import Logo from "../assets/website-logo.svg";

//Redux
import { connect } from "react-redux";

const SideBar = ({ user, elements, removeBorder }) => {
  return (
    <Box
      maxWidth={{ md: "18rem" }}
      textAlign="center"
      borderRightWidth={removeBorder ? "0" : "1px"}
      height="100vh"
      position={{ md: "fixed" }}
    >
      <Box
        borderBottomWidth="1px"
        textAlign="center"
        paddingY="10px"
        display={{ base: "none", md: "block" }}
      >
        <Image src={Logo} display="block" margin="auto" />
      </Box>
      <Box mt={{ base: "50px", md: "30px" }} textAlign="center">
        {elements.map(element => element)}
      </Box>
    </Box>
  );
};

SideBar.propTypes = {
  user: PropTypes.object.isRequired,
  elements: PropTypes.array.isRequired,
  removeBorder: PropTypes.bool
};

const mapStatetoProps = state => ({
  user: state.user
});

export default connect(mapStatetoProps)(SideBar);
