import React from "react";
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
      <Image src={Logo} display="block" margin="auto" />
    </Box>
  );
};

export default TopHeader;
