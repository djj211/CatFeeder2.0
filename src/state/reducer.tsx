import { Reducer } from "react";
import moment from "moment";

import * as Types from "./types";
import { CommonState, Action } from "../interfaces/interfaces";

const initialState: CommonState = {
  retFeedData: [],
  loaded: false,
  errorTxt: "",
  hasError: false,
  lastFeed: moment(),
  hasFeedError: false,
  feedErrorTxt: "",
  feedLoaded: false,
};

const CommonReducer: Reducer<CommonState, Action> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case Types.SET_HISTORY:
      return {
        ...state,
        retFeedData: payload,
      };
    case Types.SET_LOADED:
      return {
        ...state,
        loaded: payload,
      };
    case Types.SET_ERROR_TEXT:
      return {
        ...state,
        errorTxt: payload,
      };
    case Types.SET_ERROR:
      return {
        ...state,
        hasError: payload,
      };
    case Types.SET_LAST_FEED:
      return {
        ...state,
        lastFeed: payload,
      };
    case Types.SET_HAS_FEED_ERROR:
      return {
        ...state,
        hasFeedError: payload,
      };
    case Types.SET_FEED_ERROR_TEXT:
      return {
        ...state,
        feedErrorTxt: payload,
      };
    case Types.SET_FEED_LOADED:
      return {
        ...state,
        feedLoaded: payload,
      };
    default:
      return state;
  }
};

export default CommonReducer;
