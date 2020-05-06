//React
import React from "react";
import PropTypes from "prop-types";

//React Router
import { Link as ReachLink, Router } from "@reach/router";

//Redux
import { connect } from "react-redux";
import { uploadProfilePicture } from "../redux/actions/userActions";

//Components
import SideBarComponent from "../components/DashboardSidebar";
import TopHeader from "../components/TopHeader";
import Catalogue from "../components/Catalogue";
import Favorites from "../components/Favorites";
import Dashboard from "../components/StudentDashboard";

//Utilities
import { openUploadWidget } from "../utils/CloudinaryService";

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

const SideBar = ({ user, removeBorder, uploadProfilePicture }) => {
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
        <Button
          color="white"
          background="black"
          onClick={() => {
            openUploadWidget(
              {
                cloudName: "udemic",
                uploadPreset: "sample",
                tags: ["Profile-image"],
                cropping: true,
                multiple: false,
                theme: "white"
              },
              (error, result) => {
                if (!error) {
                  console.log(result[0].url);
                  uploadProfilePicture(
                    result[0].url,
                    user.credentials.id,
                    "student"
                  );
                } else {
                  console.log(error);
                }
              }
            );
          }}
        >
          <Icon name="edit" mr="5px" />
          Edit Picture
        </Button>
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
      <Link to="./catalogue" fontSize="xl" as={ReachLink}>
        <Icon name="copy" size="32px" mr="10px" />
        Courses Catalogue
      </Link>
      <Divider />
    </Box>,
    <Box>
      <Link to="./favorites" fontSize="xl" as={ReachLink}>
        <Icon name="star" size="32px" mr="10px" />
        Favorites
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

const StudentPanel = ({ user, UI, uploadProfilePicture }) => {
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
            <SideBar
              user={user}
              removeBorder={true}
              uploadProfilePicture={uploadProfilePicture}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box display={{ md: "flex" }}>
        <Box display={{ base: "none", md: "block" }}>
          <SideBar user={user} uploadProfilePicture={uploadProfilePicture} />
        </Box>
        <Router>
          <Catalogue path="catalogue" />
          <Favorites path="favorites" />
          <Dashboard path="/" />
        </Router>
      </Box>
    </Box>
  );
};

StudentPanel.propTypes = {
  UI: PropTypes.object,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = { uploadProfilePicture };

export default connect(mapStateToProps, mapActionsToProps)(StudentPanel);
