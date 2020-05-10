import React, { useState } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";

//Chakra UI
import {
  Heading,
  Box,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useDisclosure,
  Input,
  Textarea,
  Button,
  Icon,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "@chakra-ui/core";

//Cloudinary upload widget
import { createUploadWidget } from "../utils/CloudinaryService";

import axios from "axios";

//Form validation libraries - Formik and Yup
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

//Axios defaults
axios.defaults.baseURL = "https://udemic-server.herokuapp.com";
axios.defaults.headers.common["Content-Type"] = "application/json";

const TutForm = ({ googleId, firstName, lastName }) => {
  const [videoInfo, setVideoInfo] = useState();
  //Code to open upload success modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  //create cloudinary upload widget in memory
  const createWidget = createUploadWidget(
    {
      cloudName: "udemic",
      uploadPreset: "sample",
      tags: ["tutorial"],
      multiple: false,
      theme: "white"
    },
    (error, result) => {
      if (!error) {
        console.log(result);
        let { url, path } = result[0];
        let pathJpg = path.replace(/\.\w*/, ".jpg");
        let thumbnail = `https://res.cloudinary.com/udemic/video/upload/w_200,h_200,c_fit/${pathJpg}`;
        let info = { thumbnail, url };
        console.log(thumbnail);
        setVideoInfo(info);
      }
    }
  );

  //Handle cloudinary upload
  const handleUpload = () => {
    createWidget.open();
  };

  //An object shema to help with validation powerd by Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required Field"),
    category: Yup.string().required("Required Field"),
    description: Yup.string().required("Required FIeld")
  });

  return (
    <Formik
      initialValues={{ title: "", category: "", description: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { errors }) => {
        if (!errors) {
          let { category, title, description } = values;
          let uploadTime = new Date().toISOString();
          let tutorialInfo = {
            videoUrl: videoInfo.url,
            createdAt: uploadTime,
            starsCount: 0,
            thumbnail: videoInfo.thumbnail,
            category,
            title,
            description,
            createdBy: googleId,
            instructorName: `${lastName} ${firstName}`
          };

          axios.post("/tutorials", tutorialInfo).then(res => {
            console.log(res);
            onOpen();
          });
          console.log(tutorialInfo);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Field name="title">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  {...field}
                  id="title"
                  placeholder="Video Tutorial Title"
                />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="category">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.category && form.touched.category}
              >
                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                  {...field}
                  id="category"
                  placeholder="Video Tutorial Category"
                />
                <FormErrorMessage>{form.errors.category}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="description">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
              >
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Description"
                />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Box>
            {videoInfo ? (
              <Box
                rounded="lg"
                padding="5px"
                backgroundColor="gray.100"
                width="auto"
                maxWidth="auto"
                mt={6}
              >
                <Image src={videoInfo.thumbnail} ruonded="lg" />
                <Text mt="5px" fontSize="sm" fontWeight="semibold">
                  Video added
                </Text>
              </Box>
            ) : (
              <Button mt={6} onClick={handleUpload}>
                <Icon name="add" mr={2} />
                Add Video
              </Button>
            )}
          </Box>
          <Button
            mt={6}
            backgroundColor="black"
            color="white"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
          {/* Video created success modal */}
          <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick="false">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">
                Content Added Successfully
              </ModalHeader>
              <ModalBody textAlign="center">
                <Icon name="check-circle" size="48px" color="green.400" />
              </ModalBody>

              <ModalFooter textAlign="center">
                <Button
                  backgroundColor="black"
                  mx="auto"
                  color="white"
                  onClick={() => {
                    window.location = "/instructor";
                  }}
                >
                  Proceed
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

const AddCourse = ({ googleId, firstName, lastName }) => {
  return (
    <Box mx="auto" maxWidth={{ base: "90%", md: "52rem" }}>
      <Heading mt={{ base: "30px", md: "50px" }}>Add New Course</Heading>
      <Text>Create a new single-video course</Text>
      <Box mt={6}>
        <TutForm
          googleId={googleId}
          firstName={firstName}
          lastName={lastName}
        />
      </Box>
    </Box>
  );
};

AddCourse.propTypes = {
  googleId: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  googleId: state.user.credentials.googleId,
  firstName: state.user.credentials.firstName,
  lastName: state.user.credentials.lastName
});

export default connect(mapStateToProps)(AddCourse);
