import {
  SET_DATA,
  SET_VIDEO,
  FAVORITE_VIDEO,
  UNFAVORITE_VIDEO,
  STAR_VIDEO,
  UNSTAR_VIDEO,
  LOADING_DATA,
  STOP_LOADING_DATA,
  LOADING_TINY_CHANGE,
  STOP_LOADING_TINY_CHANGE
} from "../types";

const initialState = {
  videos: [],
  video: {},
  favorites: [],
  starred: [],
  loading: false,
  loadingTinyChange: false //Oh God, Save my code!
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_TINY_CHANGE:
      return {
        ...state,
        loadingTinyChange: true
      };

    case STOP_LOADING_TINY_CHANGE:
      return {
        ...state,
        loadingTinyChange: false
      };

    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };

    case STOP_LOADING_DATA:
      return {
        ...state,
        loading: false
      };
    case SET_DATA:
      return {
        ...state,
        videos: action.payload.videos,
        favorites: action.payload.favorites,
        starred: action.payload.stars,
        loading: false
      };
    case SET_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case FAVORITE_VIDEO:
      let indexFavoriteVideo = state.videos.findIndex(
        video => video.id === action.payload.video.id
      );
      state.videos[indexFavoriteVideo] = action.payload.video;

      state.favorites.push(action.payload.favorite);

      // if (state.video.id === action.payload.video.id) {
      //   state.video = action.payload.video;
      // }
      return {
        ...state
      };
    case UNFAVORITE_VIDEO:
      let indexUnfavoriteVideo = state.videos.findIndex(
        video => video.id === action.payload.video.id
      );
      state.videos[indexUnfavoriteVideo] = action.payload.video;

      let favoriteIndex = state.favorites.findIndex(
        favorite => favorite.id === action.payload.favorite.id
      );
      state.favorites.splice(favoriteIndex, 1);
      // if (state.video.id === action.payload.video.id) {
      //   state.video = action.payload.video;
      // }
      return {
        ...state
      };
    case STAR_VIDEO:
      let indexStarVideo = state.videos.findIndex(
        video => video.id === action.payload.video.id
      );
      state.videos[indexStarVideo] = action.payload.video;

      state.starred.push(action.payload.star);
      if (state.video.id === action.payload.video.id) {
        state.video = action.payload.video;
      }
      return {
        ...state
      };

    case UNSTAR_VIDEO:
      let indexUnstarVideo = state.videos.findIndex(
        video => video.id === action.payload.video.id
      );
      state.videos[indexUnstarVideo] = action.payload.video;

      let starIndex = state.starred.findIndex(
        star => star.id === action.payload.star.id
      );
      state.starred.splice(starIndex, 1);
      if (state.video.id === action.payload.video.id) {
        state.video = action.payload.video;
      }
      return {
        ...state
      };

    default:
      return state;
  }
}
