import { put, takeEvery, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  startFetching,
  finishFetching,
  init,
  setCity,
  setErrorCity,
  clearError,
  setLang,
  saveHistory,
  getLang,
  getCity,
} from "./weatherSlice";
import { getWeather } from "../../api";
import { RU_LANG, EN_LANG } from "../../common/constants";

function* setCityWorker({ payload }: PayloadAction<string>) {
  try {
    yield put(startFetching());

    const lang = yield select(getLang);
    const data = yield getWeather(payload, lang);

    if (data.message === "city not found") {
      yield put(setErrorCity());
    } else {
      const initData = getInitData(data, lang);
      yield put(init(initData));

      if (initData.city) {
        const historyItem = { city: initData.city, createDate: +new Date(), id: +new Date(), ...initData.days[0] };
        yield put(saveHistory(historyItem));
      }

      yield put(clearError());
    }

    yield put(finishFetching());
  } catch (error) {
    console.log("weatherFlow - Saga - Error - " + error);
  }
}
function* setLangWorker({ payload }: PayloadAction<string>) {
  try {
    yield put(startFetching());

    const city = yield select(getCity);
    const data = yield getWeather(city, payload);

    if (data.message === "city not found") {
      yield put(setErrorCity());
    } else {
      const initData = getInitData(data, payload);
      yield put(init(initData));

      if (initData.city) {
        const historyItem = { city: initData.city, createDate: +new Date(), id: +new Date(), ...initData.days[0] };
        yield put(saveHistory(historyItem));
      }

      yield put(clearError());
    }

    yield put(finishFetching());
  } catch (error) {
    console.log("weatherFlow - Saga - Error - " + error);
  }
}

function getInitData(data: any, lang: string) {
  const days: any = {};

  data.list?.forEach((item: any) => {
    const day = item.dt_txt.slice(0, 10);
    const dayOfWeek = new Date(
      Number(day.slice(0, 4)),
      Number(day.slice(5, 7)) - 1,
      Number(day.slice(8, 10))
    ).toLocaleString(lang, {
      weekday: "long",
    });

    const dateString = new Date(item.dt * 1000).toLocaleString(lang, {
      month: "long",
      day: "numeric",
    });

    if (days[day]) {
      if (["00:00:00", "06:00:00", "12:00:00", "18:00:00"].includes(item.dt_txt.slice(-8))) days[day].data.push(item);
    } else {
      days[day] = {
        dayOfWeek,
        data: [item],
        dateString,
      };
    }
  });

  const daysObj = Object.keys(days).map((d) => ({
    date: d,
    dayOfWeek: days[d].dayOfWeek,
    dateString: days[d].dateString,
    list: [...days[d].data],
  }));

  return {
    city: data.city?.name,
    days: daysObj,
  };
}

export function* weatherFlow() {
  const lang = window.navigator.language.slice(0, 2);
  if ([RU_LANG, EN_LANG].includes(lang)) yield put(setLang(lang));

  const initCity = lang === EN_LANG ? "Moscow" : "Москва";

  try {
    yield put(startFetching());
    const data = yield getWeather(initCity, lang);

    const initData = getInitData(data, lang);
    yield put(init(initData));

    if (initData.city) {
      const historyItem = { city: initData.city, createDate: +new Date(), id: +new Date(), ...initData.days[0] };
      yield put(saveHistory(historyItem));
    }

    yield put(finishFetching());
  } catch (error) {
    console.log(error);
  }

  yield takeEvery(setCity, setCityWorker);
  yield takeEvery(setLang, setLangWorker);
}
