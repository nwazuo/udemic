import React from "react";
import { Link } from "@reach/router";
import { Box, Image, IconButton } from "@chakra-ui/core";

import Logo from "../assets/website-logo.svg";

const TopHeader = ({ hideOnPC, hamburgerMenuWithHandler }) => {
  return (
    <Box
      borderBottomWidth="1px"
      textAlign="center"
      paddingY="10px"
      display={hideOnPC ? { base: "block", md: "none" } : "block"}
    >
      {hamburgerMenuWithHandler ? (
        <IconButton
          backgroundColor="black"
          color="white"
          aria-label="Open Sidebar"
          icon="arrow-right"
          float="left"
          size="sm"
          ml="20px"
          onClick={hamburgerMenuWithHandler}
        />
      ) : (
          ""
        )}
      <Link to="/"><Image src={Logo} display="inline-block" margin="auto" /></Link>
    </Box>
  );
};

export default TopHeader;
