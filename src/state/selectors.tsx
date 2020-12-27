import { get } from "lodash";
import moment from "moment";
import { createSelector } from "reselect";

import * as Interfaces from "../interfaces/interfaces";

const root = (state: Interfaces.AppState) => get(state, "commonState");

export const getHistory = (state: Interfaces.AppState) =>
  get(root(state), "retFeedData", []);
export const getLoaded = (state: Interfaces.AppState) =>
  get(root(state), "loaded", false);
export const getErrorText = (state: Interfaces.AppState) =>
  get(root(state), "errorTxt", "");
export const getHasError = (state: Interfaces.AppState) =>
  get(root(state), "hasError", false);
export const getLastFeed = (state: Interfaces.AppState) =>
  get(root(state), "lastFeed", moment());
export const getFeedErrorText = (state: Interfaces.AppState) =>
  get(root(state), "feedErrorTxt", "");
export const getHasFeedError = (state: Interfaces.AppState) =>
  get(root(state), "hasFeedError", false);
export const getFeedLoaded = (state: Interfaces.AppState) =>
  get(root(state), "feedLoaded", false);

export const overFourHours = createSelector([getLastFeed], (lastFeed) => {
  const duration = moment.duration(moment().diff(lastFeed));
  if (duration.asHours() > 4) {
    return true;
  }
  return false;
});
