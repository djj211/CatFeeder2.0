import moment from "moment";

export interface feedData {
  feedDate: string;
  feedTime: string;
}

export interface Action {
  type: string;
  payload: any;
}

export interface CommonState {
  retFeedData: feedData[];
  loaded: boolean;
  errorTxt: string;
  hasError: boolean;
  lastFeed: moment.Moment;
  hasFeedError: boolean;
  feedErrorTxt: string;
  feedLoaded: boolean;
}

export interface AppState {
  commonState: CommonState;
}

export interface FeedApi {
  time: string;
}
