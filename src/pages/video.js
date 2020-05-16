import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

//Reach router
import { navigate } from "@reach/router";

//Components
import TopHeader from "../components/TopHeader";
import StarButton from "../components/StarButton";
import FavoriteButton from "../components/FavoriteButton";

//Chakra UI
import {
  Heading,
  Text,
  Box,
  Button,
  Icon,
  Badge,
  Spinner
} from "@chakra-ui/core";

//Cloudinary
import { Video as DisplayVideo } from "cloudinary-react";

//Redux
import { connect } from "react-redux";
import { getVideo } from "../redux/actions/dataActions";

const Video = ({ videoId, video, getVideo, loading, dispatch, user }) => {
  // let cld = window.cloudinary.Cloudinary.new({ cloud_name: "udemic" });
  // console.log(cld);
  // let player = cld.videoPlayer("player");
  // let source = { publicId: video.publicId, info: { title: video.title } };

  useEffect(() => {
    getVideo(videoId);
  }, []);

  return (
    <>
      <TopHeader />
      <Box maxWidth={{ base: "100%", md: "50%" }} mx="auto">
        <Button
          variant="outline"
          borderColor="gray.200"
          mt={5}
          onClick={() => navigate(-1)}
        >
          <Icon name="arrow-back" mr={2} />
          Back
        </Button>
        {loading ? (
          <Box textAlign="center">
            <Spinner />
          </Box>
        ) : (
          <>
            <Box width={{ base: "90%", md: "100%" }} mx="auto">
              <Heading mt={5}>{video.title}</Heading>
              <Badge fontSize="0.8em" variantColor="green">
                {video.category}
              </Badge>
              <Box display="flex" mt={3}>
                <Icon name="info-outline" mr={1} />
                <Text lineHeight={1} fontWeight="semibold">
                  {video.instructorName}
                </Text>
              </Box>
            </Box>
            <Box mt={6}>
              {JSON.stringify(video) !== "{}" ? (
                <DisplayVideo
                  publicId={video.publicId}
                  cloudName="udemic"
                  controls={true}
                  className="video"
                  width="100%"
                ></DisplayVideo>
              ) : (
                ""
              )}
            </Box>
            {localStorage.userType === "student" ? (
              <Box
                width={{ base: "90%", md: "100%" }}
                mx="auto"
                display="flex"
                border="1px"
                rounded="lg"
                mt={5}
                borderColor="gray.200"
              >
                <Box flexBasis="50%" textAlign="center" padding="10px">
                  <StarButton video={video} />
                </Box>
                <Box
                  flexBasis="50%"
                  textAlign="center"
                  padding="10px"
                  borderLeft="1px"
                  borderColor="gray.200"
                >
                  <FavoriteButton video={video} noPositionAbsolute={true} />
                </Box>
              </Box>
            ) : (
              ""
            )}
            <Box width={{ base: "90%", md: "100%" }} mx="auto">
              <Heading size="lg" mt={5}>
                Description
              </Heading>
              <Text>{video.description}</Text>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

Video.propTypes = {};

const mapStateToProps = state => ({
  user: state.user.credentials,
  video: state.data.video,
  favorites: state.data.favorites,
  starred: state.data.starred,
  loading: state.data.loading
});

const mapActionsToProps = {
  getVideo
};

export default connect(mapStateToProps, mapActionsToProps)(Video);
