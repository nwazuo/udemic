import React, { useState } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { favoriteVideo, unfavoriteVideo } from "../redux/actions/dataActions";

//Chakra UI
import { Heading, Text, Box, Divider, Button } from "@chakra-ui/core";

//components
import VideoCard from "./VideoCard";

const Favorites = ({ favorites, loading }) => {
  const favoritedVideos = favorites.map(favorite => favorite.video);

  return (
    <Box mx="auto" maxWidth={{ base: "90%", md: "52rem" }}>
      <Heading mt={{ base: "30px", md: "50px" }}>Favorites</Heading>
      <Text>Videos Marked as Favorites</Text>
      <VideoCard videoData={favoritedVideos} loading={loading} />
    </Box>
  );
};

Favorites.propTypes = {
  videos: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  studentId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  videos: state.data.videos,
  favorites: state.data.favorites,
  studentId: state.user.credentials.id,
  loading: state.data.loading,
  loadingTinyChange: state.data.loadingTinyChange
});

const mapActionsToProps = {
  favoriteVideo,
  unfavoriteVideo
};

export default connect(mapStateToProps, mapActionsToProps)(Favorites);
