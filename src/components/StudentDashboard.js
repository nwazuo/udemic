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

const Dashboard = ({ starred, loading }) => {
  const starredVideos = starred.map(star => star.video);

  return (
    <Box mx="auto" maxWidth={{ base: "90%", md: "52rem" }}>
      <Heading mt={{ base: "30px", md: "50px" }}>Dashboard</Heading>
      <Text>Welcome to your dashboard</Text>
      <Heading fontSize="lg" mt={6}>
        Starred Videos
      </Heading>
      <Divider />
      <VideoCard videoData={starredVideos} loading={loading} />
    </Box>
  );
};

Dashboard.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);

// const Dashboard = ({
//   videos,
//   favorites,
//   favoriteVideo,
//   studentId,
//   loading,
//   unfavoriteVideo,
//   starVideo,
//   unstarVideo,
//   starred
// }) => {
//   const [favorited, setFavorited] = useState(favorites);
//   return (
//     <>
//       <Heading>Dashboard(student)</Heading>
//       <Heading fontSize="md">Videos</Heading>
//       <Text>{JSON.stringify(videos)}</Text>
//       <Heading fontSize={"md"}>Favorites</Heading>
//       {favorites
//         .map(favorite => (
//           <>
//             <Text>{JSON.stringify(favorite)}</Text>
//             <Divider />
//           </>
//         ))
//         .reverse()}
//       <Heading fontSize={"md"}>Starred</Heading>
//       {starred
//         .map(star => (
//           <>
//             <Text>{JSON.stringify(star)}</Text>
//             <Divider />
//           </>
//         ))
//         .reverse()}
//       <Button
//         onClick={() => favoriteVideo(videos[1], studentId)}
//       >{`Favorite Video by User(${studentId})`}</Button>
//       <Button
//         onClick={() => unfavoriteVideo(videos[1], favorites)}
//       >{`UnFavorite Video by User(${studentId})`}</Button>
//       <Button
//         onClick={() => starVideo(videos[2], studentId)}
//       >{`Star Video by User(${studentId})`}</Button>
//       <Button
//         onClick={() => unstarVideo(videos[2], starred)}
//       >{`UnStar Video by User(${studentId})`}</Button>
//     </>
//   );
// };
