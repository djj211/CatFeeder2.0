import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  ApplicationProvider,
  TopNavigation,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  IconProps,
  IconRegistry,
} from "@ui-kitten/components";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./store/configureStore";
import AppStateListener from "./components/AppStateListener/AppStateListener";

import Feed from "./screens/Feed/Feed";
import History from "./screens/History/History";

const { Navigator, Screen } = createBottomTabNavigator();
const { store, persistor } = configureStore();

const App = () => {
  const homeIcon = (props: IconProps) => (
    <Icon {...props} name="home-outline" />
  );

  const historyIcon = (props: IconProps) => (
    <Icon {...props} name="clock-outline" />
  );

  const BottomTabBar = (props: BottomTabBarProps) => {
    const { state, navigation } = props;

    return (
      <BottomNavigation
        selectedIndex={state.index}
        onSelect={(index) => navigation.navigate(state.routeNames[index])}
      >
        <BottomNavigationTab title="Feed" icon={homeIcon} />
        <BottomNavigationTab title="History" icon={historyIcon} />
      </BottomNavigation>
    );
  };

  const TabNavigator = () => (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Feed" component={Feed} />
      <Screen name="History" component={History} />
    </Navigator>
  );

  return (
    <React.Fragment>
      <StoreProvider store={store}>
        <PersistGate persistor={persistor}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.dark}>
            <TopNavigation
              title="Cat Feeder"
              alignment="center"
              style={{ marginBottom: -2 }}
            />
            <NavigationContainer>
              <AppStateListener />
              <TabNavigator />
            </NavigationContainer>
          </ApplicationProvider>
        </PersistGate>
      </StoreProvider>
    </React.Fragment>
  );
};

export default App;
