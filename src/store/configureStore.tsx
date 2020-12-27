import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import rootReducer from "./rootReducer";
import * as Middleware from "./middleware";
import { Api } from "../Api/Api";

const blacklistPaths = ["commonState"];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: blacklistPaths.filter((a) => !a.includes(".")),
};

const api = new Api();
const middleware = [Middleware.createApiMiddleware<Api>(api)];
const persistedReducer = persistReducer(persistConfig, rootReducer);

const ConfigureStore = (): any => {
  const api = new Api();
  const middleware = [Middleware.createApiMiddleware<Api>(api)];
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

export default ConfigureStore;
