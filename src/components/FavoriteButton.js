import React from "react";
import PropTypes from "prop-types";

//Chakra UI
import { Icon, Button, Text, Box, useToast } from "@chakra-ui/core";

//Redux
import { connect } from "react-redux";
import { favoriteVideo, unfavoriteVideo } from "../redux/actions/dataActions";

const FavoriteButton = ({
  favorites,
  video,
  loadingTinyChange,
  studentId,
  favoriteVideo,
  unfavoriteVideo
}) => {
  const toast = useToast();
  const favoritedVideo = () => {
    if (
      favorites &&
      favorites.find(favorite => favorite.videoId === video.id)
    ) {
      return true;
    } else return false;
  };

  return (
    <Box
      position="absolute"
      top={{ base: "30px", md: "10px" }}
      left={{ base: "30px", md: "auto" }}
      right={{ base: "auto", md: "10px" }}
    >
      {" "}
      {favoritedVideo() ? (
        <Button
          color="white"
          backgroundColor="black"
          size="xs"
          opacity="0.5"
          isDisabled={loadingTinyChange}
          onClick={() =>
            unfavoriteVideo(
              video,
              favorites,
              toast({
                title: "Removed From Favorites",
                description: "Video Removed from favorites",
                status: "success",
                duration: 3000,
                isClosable: true
              })
            )
          }
        >
          <Icon name="minus" mr={2} />
          Remove From Favorites
        </Button>
      ) : (
        <Button
          color="white"
          backgroundColor="black"
          size="xs"
          opacity="0.5"
          isDisabled={loadingTinyChange}
          onClick={() =>
            favoriteVideo(
              video,
              studentId,
              toast({
                title: "Added to Favorites",
                description: "Video added to  favorites",
                status: "success",
                duration: 3000,
                isClosable: true
              })
            )
          }
        >
          <Icon name="check" mr={2} />
          Add to favorites
        </Button>
      )}
    </Box>
  );
};

//Proptypes

//mapStateToProps
const mapStateToProps = state => ({
  favorites: state.data.favorites,
  loadingTinyChange: state.data.loadingTinyChange,
  studentId: state.user.credentials.id
});

const mapActionsToProps = {
  favoriteVideo,
  unfavoriteVideo
};

export default connect(mapStateToProps, mapActionsToProps)(FavoriteButton);
