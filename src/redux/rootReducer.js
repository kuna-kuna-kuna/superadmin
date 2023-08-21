import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// import translationReducer from './slices/translation';
import mainReducer from "./slices/mainContext";
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  main: mainReducer,
});

export { rootPersistConfig, rootReducer };
