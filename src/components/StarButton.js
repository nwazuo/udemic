import React from "react";
import PropTypes from "prop-types";

//Chakra UI
import { IconButton, Text, Box, useToast } from "@chakra-ui/core";

//Redux
import { connect } from "react-redux";
import { starVideo, unstarVideo } from "../redux/actions/dataActions";

const StarButton = ({
  starred,
  video,
  loadingTinyChange,
  studentId,
  starVideo,
  unstarVideo
}) => {
  const toast = useToast();
  const starredVideo = () => {
    if (starred && starred.find(star => star.videoId === video.id)) return true;
    else return false;
  };
  console.log(video);

  return (
    <Box display="flex" mr={{ base: 3, md: 5 }} justifyContent="center">
      {starredVideo() ? (
        <IconButton
          minWidth="auto"
          variant="ghost"
          padding={0}
          height="1rem"
          icon="star"
          color="yellow.200"
          mr={1}
          isDisabled={loadingTinyChange}
          onClick={() => {
            unstarVideo(
              video,
              starred,
              toast({
                title: "Video UnStarred",
                description: "Video removed from dashboard",
                status: "success",
                duration: 3000,
                isClosable: true
              })
            );
          }}
        />
      ) : (
        <IconButton
          height="1rem"
          isDisabled={loadingTinyChange}
          minWidth="auto"
          variant="ghost"
          padding={0}
          icon="star"
          color="gray.500"
          mr={1}
          onClick={() => {
            starVideo(
              video,
              studentId,
              toast({
                title: "Video Starred",
                description: "Starred video added to dashboard",
                status: "success",
                duration: 3000,
                isClosable: true
              })
            );
          }}
        />
      )}
      <Text lineHeight={1}>{`(${video.starsCount})`}</Text>
    </Box>
  );
};

//Proptypes

//mapStateToProps
const mapStateToProps = state => ({
  starred: state.data.starred,
  loadingTinyChange: state.data.loadingTinyChange,
  studentId: state.user.credentials.id
});

const mapActionsToProps = {
  starVideo,
  unstarVideo
};

export default connect(mapStateToProps, mapActionsToProps)(StarButton);
