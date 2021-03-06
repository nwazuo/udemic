//React
import React from "react";
import PropTypes from "prop-types";

//React Router
import { Link as ReachLink, Router } from "@reach/router";

//Redux
import { connect } from "react-redux";
import { uploadProfilePicture, logoutUser } from "../redux/actions/userActions";

//Components
import SideBarComponent from "../components/SideBar";
import TopHeader from "../components/TopHeader";
import Dashboard from "../components/InstructorDashboard";

//Utilities
import { createUploadWidget } from "../utils/CloudinaryService";

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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast
} from "@chakra-ui/core";
import AddCourse from "../components/AddCourse";

const SideBar = ({ user, removeBorder, uploadProfilePicture, logoutUser }) => {
  const { firstName, lastName, imageUrl, email } = user.credentials;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const createWidget = createUploadWidget(
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
          "instructor",
          toast({
            title: "Profile Photo Changed",
            description: "Successully uploaded profile photo",
            status: "success",
            duration: 3000,
            isClosable: true
          })
        );
      } else {
        console.log(error);
      }
    }
  );

  const handleImageUpload = () => {
    createWidget.open();
  };

  const elements = [
    <Box>
      <Stack spacing={2} align="center" mb="20px" padding={10}>
        <Avatar name={`${firstName} ${lastName}`} src={imageUrl} />
        <Text
          fontSize="xl"
          fontWeight="bold"
        >{`${firstName} ${lastName}`}</Text>
        <Text fontSize="xl">({email})</Text>
        <Button color="white" background="black" onClick={handleImageUpload}>
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
      <Link to="addcontent" fontSize="xl" as={ReachLink}>
        <Icon name="plus-square" size="32px" mr="10px" />
        Add Content
      </Link>
      <Divider />
    </Box>,
    <Box>
      <Button fontSize="xl" onClick={onOpen}>
        <Icon name="close" mr="10px" />
        Logout
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Proceed to Log out?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              as={Link}
              to="/signin"
              variantColor="red"
              onClick={logoutUser}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  ];
  return <SideBarComponent elements={elements} removeBorder={removeBorder} />;
};

const InstructorPanel = ({ user, UI, uploadProfilePicture, logoutUser }) => {
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
              logoutUser={logoutUser}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box>
        <Box display={{ base: "none", md: "block" }}>
          <SideBar
            user={user}
            uploadProfilePicture={uploadProfilePicture}
            logoutUser={logoutUser}
          />
        </Box>
        <Box pt={{ base: "10px", md: "40px" }} pl={{ md: "18rem" }}>
          <Router>
            <AddCourse path="addcontent" />
            <Dashboard path="/" />
          </Router>
        </Box>
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

const mapActionsToProps = { uploadProfilePicture, logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(InstructorPanel);
