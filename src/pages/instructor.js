//React
import React from "react";
import PropTypes from "prop-types";

//React Router
import { Link as ReachLink, Router } from "@reach/router";

//Redux
import { connect } from "react-redux";

//Components
import SideBarComponent from "../components/DashboardSidebar";
import TopHeader from "../components/TopHeader";

//Chakra UI
import {
  Icon,
  Box,
  Link,
  Divider,
  Avatar,
  Text,
  Button,
  Stack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/core";
import AddCourse from "../components/AddCourse";

const SideBar = ({ user, removeBorder }) => {
  const { firstName, lastName, imageUrl, email } = user.credentials;
  const elements = [
    <Box>
      <Stack spacing={2} align="center" mb="20px" padding={10}>
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
  return <SideBarComponent elements={elements} removeBorder={removeBorder} />;
};

const InstructorPanel = ({ user, UI }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box>
      <TopHeader hideOnPC={true} hamburgerMenuWithHandler={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <SideBar user={user} removeBorder={true} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box display={{ md: "flex" }}>
        <Box display={{ base: "none", md: "block" }}>
          <SideBar user={user} />
        </Box>
        <Router>
          <AddCourse path="addcourse" />
        </Router>
      </Box>
    </Box>
  );
};

InstructorPanel.propTypes = {
  UI: PropTypes.object,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps)(InstructorPanel);
