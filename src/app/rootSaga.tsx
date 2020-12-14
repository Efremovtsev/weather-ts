import { fork } from "redux-saga/effects";
import { weatherFlow } from "../features/weather/saga";

function* sagas() {
  yield fork(weatherFlow);
}

export default sagas;
