import React from "react";
import { Box, Image } from "@chakra-ui/core";

import Logo from "../assets/website-logo.svg";

const TopHeader = () => {
  return (
    <Box borderBottomWidth="1px" textAlign="center" paddingY="10px">
      <Image src={Logo} display="block" margin="auto" />
    </Box>
  );
};

export default TopHeader;
