import React from "react";
import {
  Flex,
  Text,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button
} from "@chakra-ui/core";
import { AiFillBank } from "react-icons/ai";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const Signup = ({ invi }) => {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too short!")
      .required("Required"),
    email: Yup.string()
      .email("Invalid Email")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password length must be more than 8")
      .required("Required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords Must Match")
      .required("Required")
  });

  let invince = invi;

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", cpassword: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, { errors }) => {
        if (!errors) {
          console.log(values, invince);
          invince.click();
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="Ciroma Shoekwuma Adekunle"
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor="Email">Email</FormLabel>
                <Input {...field} id="email" placeholder="Email Address" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  {...field}
                  id="password"
                  placeholder="Enter Password"
                  type="password"
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="cpassword">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.cpassword && form.touched.cpassword}
              >
                <FormLabel htmlFor="cpassword">Confirm Password</FormLabel>
                <Input
                  {...field}
                  id="cpassword"
                  placeholder="Confirm Password"
                  type="password"
                />
                <FormErrorMessage>{form.errors.cpassword}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button mt={4} variantColor="blue" type="submit">
            {" "}
            Register{" "}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

// const ModalAfterLogin = (isOpen, onOpen, onClose) => {
// const {isOpen, onOpen, onClose} = useDisclosure();
// return (
//   <>

//   </>
// )
// }

const Chakra = () => {
  let invisibleBtn;
  return (
    <Flex
      width="100vw"
      height="100vh"
      backgroundImage="url('https://images.unsplash.com/photo-1588085373094-01b22414ccbf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1498&q=80')"
      backgroundSize="cover"
      flexDir="column"
    >
      <Text
        fontSize={["3xl", "3xl", "4xl", "5xl"]}
        color="white"
        marginLeft="auto"
        marginRight="auto"
        textAlign="center"
      >
        <Box as={AiFillBank} display="inline" margin="auto" />
        The Chakra House
      </Text>

      <Box p={6} mt={8} backgroundColor="white" mx="auto">
        <Text fontSize="xl" fontWeight="bold">
          Register
        </Text>
        <Text fontSize="xl" mt={4}>
          Complete the form to register with us
        </Text>
        <Signup invi={invisibleBtn} />
        <Button
          ref={nakamoto => {
            invisibleBtn = nakamoto;
          }}
          onClick={() => console.log("You also clicked the invisible Button")}
        >
          Invisible
        </Button>
      </Box>
    </Flex>
  );
};

export default Chakra;
