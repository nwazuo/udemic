//React
import React from "react";
import PropTypes from "prop-types";

//React Router
import { Link as ReachLink, Router } from "@reach/router";

//Redux
import { connect } from "react-redux";

//Components
import SideBarComponent from "../components/DashboardSidebar";

//Chakra UI
import {
  Icon,
  Box,
  Link,
  Divider,
  Avatar,
  Text,
  Button,
  Stack
} from "@chakra-ui/core";
import AddCourse from "../components/AddCourse";

const SideBar = ({ user }) => {
  const { firstName, lastName, imageUrl, email } = user.credentials;
  const elements = [
    <Box>
      <Stack spacing={2} align="center" mb="20px">
        <Avatar name={`${firstName} ${lastName}`} src={imageUrl} />
        <Text
          fontSize="xl"
          fontWeight="bold"
        >{`${firstName} ${lastName}`}</Text>
        <Text fontSize="xl">({email})</Text>
      </Stack>
    </Box>,
    <Box>
      <Link to="./" fontSize="xl" as={ReachLink}>
        <Icon name="view" size="32px" mr="10px" />
        DashBoard
      </Link>
      <Divider />
    </Box>,
    <Box>
      <Link to="./addcourse" fontSize="xl" as={ReachLink}>
        <Icon name="plus-square" size="32px" mr="10px" />
        Add Content
      </Link>
      <Divider />
    </Box>,
    <Box>
      <Link to="/logout" fontSize="xl" as={ReachLink}>
        <Icon name="close" mr="10px" />
        Logout
      </Link>
    </Box>
  ];
  return <SideBarComponent elements={elements} />;
};

const instructorPanel = ({ user, UI }) => {
  return (
    <>
      <SideBar user={user} />
      <Router>
        <AddCourse path="addcourse" />
      </Router>
    </>
  );
};

instructorPanel.propTypes = {
  UI: PropTypes.object,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps)(instructorPanel);
