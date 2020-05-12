import {
  SET_DATA,
  FAVORITE_VIDEO,
  UNFAVORITE_VIDEO,
  STAR_VIDEO,
  UNSTAR_VIDEO,
  LOADING_DATA,
  SET_VIDEO,
  SET_ERRORS,
  STOP_LOADING_UI,
  LOADING_TINY_CHANGE,
  STOP_LOADING_TINY_CHANGE
} from "../types";
import axios from "axios";

//axios defaults
axios.defaults.baseURL = "https://udemic-server.herokuapp.com";
axios.defaults.headers.common["Content-Type"] = "application/json";

//Get all videos
// export const echo = () => dispatch => {
//   console.log("echooo");
//   dispatch({ type: LOADING_DATA });
// };

export const getData = studentId => dispatch => {
  dispatch({ type: LOADING_DATA });
  let payload = {};
  const getVideos = axios.get("/videos");
  const getFavorites = axios.get(
    `/favorites?_expand=video&studentId=${studentId}`
  );
  const getStarred = axios.get(`/starred?studentId=${studentId}&_expand=video`);

  axios
    .all([getVideos, getFavorites, getStarred])
    .then(
      axios.spread((...res) => {
        payload.videos = res[0].data;
        payload.favorites = res[1].data;
        payload.stars = res[2].data;
        dispatch({ type: SET_DATA, payload: payload });
      })
    )
    .catch(errors => {
      console.log(errors);
    });
  console.log(payload);
};

//Get single video for student to view
export const getVideo = id => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/videos/${id}`)
    .then(res => {
      dispatch({
        type: SET_VIDEO,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.log(err);
    });
};

//add video to favorites
export const favoriteVideo = (video, studentId, favorites) => dispatch => {
  console.log("I was dispatched");
  // let exists = favorites.findIndex(
  //   (favorite) => favorite.videoId === video.id
  // )
  // if(exists) {
  //   console.log('Video already favorited');
  //   return;
  // }
  dispatch({ type: LOADING_TINY_CHANGE });
  let payload = {};
  axios
    .post("/favorites", { videoId: video.id, studentId })
    .then(res => {
      let id = res.data.id;
      axios.get(`/favorites/${id}?_expand=video`).then(res => {
        payload.video = video;
        payload.favorite = res.data;
        dispatch({ type: FAVORITE_VIDEO, payload });
        console.log(payload);
        dispatch({ type: STOP_LOADING_TINY_CHANGE });
      });
    })
    .catch(err => console.log(err));
};

//remove video from favorites
export const unfavoriteVideo = (video, favorites) => dispatch => {
  console.log("unfavoriting video");
  console.log(favorites);
  dispatch({ type: LOADING_TINY_CHANGE });
  let payload = {};
  let index = favorites.findIndex(favorite => favorite.videoId === video.id);
  let favoriteId = favorites[index].id;

  axios
    .delete(`favorites/${favoriteId}`)
    .then(() => {
      payload.favorite = favorites[index];
      payload.video = video;

      dispatch({ type: UNFAVORITE_VIDEO, payload: payload });
      dispatch({ type: STOP_LOADING_TINY_CHANGE });
    })
    .catch(err => console.log(err));
};

//star video
export const starVideo = (video, studentId, onFinish) => dispatch => {
  console.log("You attempted to star a video");
  dispatch({ type: LOADING_TINY_CHANGE });

  let payload = {};
  let starsCountIncrement = video.starsCount + 1;
  console.log("stars count", starsCountIncrement);
  let postStar = axios.post("/starred", { videoId: video.id, studentId });
  let patchStarsCount = axios.patch(`/videos/${video.id}`, {
    starsCount: starsCountIncrement
  });

  axios
    .all([postStar, patchStarsCount])
    .then(
      axios.spread((...response) => {
        let id = response[0].data.id;
        console.log("patch response", response[1]);
        axios
          .get(`/starred/${id}?_expand=video`)
          .then(res => {
            payload.video = response[1].data;
            payload.star = res.data;
            console.log(payload);
            dispatch({ type: STAR_VIDEO, payload });
            dispatch({ type: STOP_LOADING_TINY_CHANGE });
            if (onFinish) onFinish();
          })
          .catch(err => console.log(err));
      })
    )
    .catch(err => console.log(err));
};

//unstar a video
export const unstarVideo = (video, starred, onFinish) => dispatch => {
  dispatch({ type: LOADING_TINY_CHANGE });

  let payload = {};
  let starsCountUpdate = video.starsCount - 1;
  let index = starred.findIndex(star => star.videoId === video.id);
  let starId = starred[index].id;
  payload.star = starred[index];

  let starDelete = axios.delete(`/starred/${starId}`);
  let videoDataUpdate = axios.patch(`/videos/${video.id}`, {
    starsCount: starsCountUpdate
  });

  axios
    .all([starDelete, videoDataUpdate])
    .then(
      axios.spread((...response) => {
        payload.video = response[1].data;
        dispatch({ type: UNSTAR_VIDEO, payload });
        dispatch({ type: STOP_LOADING_TINY_CHANGE });
        if (onFinish) onFinish();
      })
    )
    .catch(err => console.log(err));
};

/* push to github */
