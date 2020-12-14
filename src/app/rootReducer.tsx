import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;
