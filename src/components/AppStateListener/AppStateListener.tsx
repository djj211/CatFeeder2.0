import React, { useRef, useState, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useDispatch } from "react-redux";

import * as CommonActions from "../../state/actions";

const AppStateListener = () => {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      dispatch(CommonActions.getLastFeed());
      dispatch(CommonActions.getHistory());
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  return null;
};

export default AppStateListener;
