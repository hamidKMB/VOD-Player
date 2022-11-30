import { combineReducers } from "redux";
import playerReducer from "./Player/playerSlice";

const rootReducer = combineReducers({
  playerReducer,
});

export default rootReducer;
