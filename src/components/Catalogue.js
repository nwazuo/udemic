import React, { useState } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import {
  favoriteVideo,
  unfavoriteVideo,
  starVideo,
  unstarVideo
} from "../redux/actions/dataActions";

//Chakra UI
import { Heading, Text, Box, Divider, Button } from "@chakra-ui/core";

//components
import VideoCard from "./VideoCard";

const Catalogue = ({ videos, loading }) => {
  return (
    <Box mx="auto" maxWidth={{ base: "90%", md: "52rem" }}>
      <Heading mt={{ base: "30px", md: "50px" }}>
        Video Courses Catalogue
      </Heading>
      <Text>Browse from our catalogue of Videos</Text>
      <VideoCard videoData={videos} loading={loading} />
    </Box>
  );
};

Catalogue.propTypes = {
  videos: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  studentId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  videos: state.data.videos,
  favorites: state.data.favorites,
  starred: state.data.starred,
  studentId: state.user.credentials.id,
  loading: state.data.loading,
  loadingTinyChange: state.data.loadingTinyChange
});

const mapActionsToProps = {
  favoriteVideo,
  unfavoriteVideo,
  starVideo,
  unstarVideo
};

export default connect(mapStateToProps, mapActionsToProps)(Catalogue);
