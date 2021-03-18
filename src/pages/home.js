import React from "react";
import { Box, Image, IconButton, Flex, Button, Link, Heading, Text, Grid } from "@chakra-ui/core";
import { Link as ReachLink } from "@reach/router";
import { DiGithubBadge } from 'react-icons/di';
import { FaTwitter } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';



import Logo from "../assets/website-logo.svg";
import ExpressLogo from "../assets/expressjs.svg";
import ReactLogo from "../assets/reactjs.svg";
import MongoDBLogo from "../assets/mongodb.svg";
import NodeJSLogo from "../assets/nodejs.svg";

const home = () => (
  <>
    <Box
      borderBottomWidth="1px"
    >
      <Box
        px="15px"
        mx="auto"
        position="relative"
        maxWidth="1180px"
        textAlign="center"
        py="15px"
      >
        <Link as={ReachLink} to="/" ml="auto"><Image src={Logo} display="inline-block" margin="auto" /></Link>
        <Flex
          justifyContent="flexEnd"
          ml="auto"
          position="absolute"
          right="10px"
          top="10px"
        >
          <Link as={ReachLink} to="/signin"><Button variantColor="gray" variant="outline" >Login</Button></Link>
          <Link as={ReachLink} to="/signin"><Button variant="solid" ml={4} display={{ base: "none", md: "inline-flex" }} variantColor="black" backgroundColor="black" >Sign up</Button></Link>
        </Flex>
      </Box>
    </Box>
    <Heading as="h1" maxWidth="600px" textAlign="center" mx="auto" mt={[20, 32]} fontSize={['4xl', '6xl']} px={4}>
      Online Learning Website Project
  </Heading>
    <Text maxWidth="620px" px={3} textAlign="center" mt={4} mx="auto" color="#474747" fontSize="lg">
      Udemic is a fullstack NodeJS/React practice project I built to showcase my web development/software engineering skill. It is an online learning platform with minimal features.
  </Text>
    <Flex mt={10} mx="auto" textAlign="center" justifyContent="center">
      <Link as={ReachLink} to="/signin"><Button rightIcon="arrow-forward" variant="solid" mr={3} variantColor="black" backgroundColor="black" _hover={{ bg: "gray.600" }} >Check it out</Button></Link>
      <Link href="https://github.com/nwazuo/udemic"><Button rightIcon={DiGithubBadge} variant="solid" variantColor="gray" backgroundColor="gray.200" _hover={{ bg: "gray.300" }} >Github</Button></Link>
    </Flex>
    <Heading as="h3" size="xs" mt={[20, 32]} textAlign="center">TOOLS AND LIBRARIES</Heading>
    <Grid gap={2} templateColumns="repeat(auto-fit, 120px)" mx="auto" justifyContent="center" mt={10}>
      {/*add more tool icons*/}
      <Image src={ReactLogo} />
      <Image src={NodeJSLogo} />
      <Image src={ExpressLogo} />
      <Image src={MongoDBLogo} />
    </Grid>
    <Heading fontSize={['2xl', '5xl']} textAlign="center" mt={24}>Features</Heading>
    <Grid maxWidth="1180px" px="15px" mx="auto" mt={10} templateColumns="repeat(auto-fit, minmax(320px, 1fr))" gap={3}>
      <Box mb={5}>
        <Heading fontSize="md" fontWeight="bold">User/Instructor Login & Registeration</Heading>
        <Text color="#47474a" mt={2}>
          A user can register as either an instructor or a student
        </Text>
      </Box>
      <Box mb={5}>
        <Heading fontSize="md" fontWeight="bold">Add Videos to Favorites</Heading>
        <Text color="#47474a" mt={2}>
          A student can add videos to their list of favorites to watch later
        </Text>
      </Box>
      <Box mb={5}>
        <Heading fontSize="md" fontWeight="bold">Edit User Profile</Heading>
        <Text color="#47474a" mt={2}>
          The user can edit their profile, and add/remove a profile image
        </Text>
      </Box>
      <Box mb={5}>
        <Heading fontSize="md" fontWeight="bold">Upload video as instructor</Heading>
        <Text color="#47474a" mt={2}>
          An instructor can upload video classes and files
        </Text>
      </Box>
      <Box mb={5}>
        <Heading fontSize="md" fontWeight="bold">Social Login</Heading>
        <Text color="#47474a" mt={2}>
          You can register and log in to the platform with your google account
        </Text>
      </Box>
    </Grid>
    <Heading as="h3" size="xs" pt={["36px", "72px"]} textAlign="center">CHECK ME OUT</Heading>
    <Grid gap={5} templateColumns="repeat(3, 45px)" justifyContent="center" mt={[8, 12]}>
      <Link href="https://twitter.com/chizonwazuo"><Link as={FaTwitter} size="2.5em" _hover={{ color: "#00acee" }}></Link></Link>
      <Link href="https://linkedin.com/in/nwazuo">
        <Link as={FaLinkedinIn} size="2.5em" _hover={{ color: "#0e76a8" }} ></Link></Link>
      <Link href="https://github.com/nwazuo"><Link as={FaGithub} size="2.5em" href="https://twitter.com/chizonwazuo" _hover={{ color: "gray.300" }}></Link></Link>
    </Grid>
    <Box borderTopWidth="1px" mt={16}>
      <Text textAlign="center" py={6}>Made By <b>Chizo</b></Text>
    </Box>
  </>
)

//toast: hey! I'm open to web development jobs and freelance gigs


export default home;
