import { ActionCreator } from "redux";
import { batch } from "react-redux";
import { Dispatch } from "react";
import moment from "moment";

import { Api } from "../Api/Api";

import * as Types from "./types";
import * as Interfaces from "../interfaces/interfaces";

export const getHistory = () => {
  return async (
    dispatch: Dispatch<Interfaces.Action>,
    getState: any,
    api: Api
  ) => {
    try {
      dispatch(setLoaded(false));
      const results = (await api.get(`history`)) as any;
      if ([200, 201].includes(results.status)) {
        batch(() => {
          dispatch(setErrorText(""));
          dispatch(setError(false));
          dispatch(setHistory(results?.data));
        });
      } else {
        batch(() => {
          dispatch(
            setErrorText(
              `Error Getting History. Code: ${results.status}. Message: ${results?.data?.message}`
            )
          );
          dispatch(setError(true));
        });
      }
    } catch (ex) {
      console.log(ex);
      batch(() => {
        dispatch(
          setErrorText(
            `Error Getting History. Code: ${ex.status}. Message: ${ex.statusText}`
          )
        );
        dispatch(setError(true));
      });
    }
    dispatch(setLoaded(true));
  };
};

export const getLastFeed = () => {
  return async (
    dispatch: Dispatch<Interfaces.Action>,
    getState: any,
    api: Api
  ) => {
    try {
      dispatch(setFeedLoaded(false));
      const results = (await api.get(`time`)) as any;
      if ([200, 201].includes(results.status)) {
        batch(() => {
          dispatch(setFeedErrorText(""));
          dispatch(setHasFeedError(false));
          dispatch(setLastFeed(moment(results?.data.date)));
          dispatch(setFeedLoaded(true));
        });
      } else {
        batch(() => {
          dispatch(
            setFeedErrorText(
              `Error Getting Last Feed. Code: ${results.status}. Message: ${results?.data?.message}`
            )
          );
          dispatch(setHasFeedError(true));
        });
      }
    } catch (ex) {
      batch(() => {
        dispatch(
          setFeedErrorText(
            `Error Getting Last Feed. Code: ${ex.status}. Message: ${ex.statusText}`
          )
        );
        dispatch(setHasFeedError(true));
      });
    }
    dispatch(setFeedLoaded(true));
  };
};

export const doFeed = (data: Interfaces.FeedApi) => {
  return async (
    dispatch: Dispatch<Interfaces.Action>,
    getState: any,
    api: Api
  ) => {
    try {
      const results = (await api.post(`feed`, data)) as any;
      if ([200, 201].includes(results.status)) {
        batch(() => {
          dispatch(setFeedErrorText(""));
          dispatch(setHasFeedError(false));
        });
      } else {
        batch(() => {
          dispatch(
            setFeedErrorText(
              `Error Doing Feed. Code: ${results.status}. Message: ${results?.data?.message}`
            )
          );
          dispatch(setHasFeedError(true));
        });
      }
    } catch (ex) {
      batch(() => {
        dispatch(
          setFeedErrorText(
            `Error Doing Feed. Code: ${ex.status}. Message: ${ex.statusText}`
          )
        );
        dispatch(setHasFeedError(true));
      });
    }
  };
};

export const setHistory: ActionCreator<Interfaces.Action> = (
  payload: Interfaces.feedData[]
) => ({
  type: Types.SET_HISTORY,
  payload,
});

export const setLoaded = (payload: boolean) => ({
  type: Types.SET_LOADED,
  payload,
});

export const setFeedLoaded = (payload: boolean) => ({
  type: Types.SET_FEED_LOADED,
  payload,
});

export const setError = (payload: boolean) => ({
  type: Types.SET_ERROR,
  payload,
});

export const setErrorText = (payload: string) => ({
  type: Types.SET_ERROR_TEXT,
  payload,
});

export const setLastFeed = (payload: moment.Moment) => ({
  type: Types.SET_LAST_FEED,
  payload,
});

export const setFeedErrorText = (payload: string) => ({
  type: Types.SET_FEED_ERROR_TEXT,
  payload,
});

export const setHasFeedError = (payload: boolean) => ({
  type: Types.SET_HAS_FEED_ERROR,
  payload,
});
