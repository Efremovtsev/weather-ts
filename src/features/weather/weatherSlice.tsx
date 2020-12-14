import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/types";
import { WeatherState } from "./types";
import { RU_LANG } from "../../common/constants";
import LOCALES from "../../common/locales";

const initialState: WeatherState = {
  fetching: false,
  city: "",
  days: null,
  error: null,
  lang: RU_LANG,
  history: {
    history: [],
    page: 0,
    size: 5,
    sort: "createDate",
    direction: "asc",
  },
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    init(state, action) {
      const { city, days } = action.payload;
      return {
        ...state,
        city,
        days,
      };
    },
    startFetching(state) {
      return { ...state, fetching: true };
    },
    setCity(state, { payload }: PayloadAction<string>) {
      return { ...state, city: payload };
    },
    setLang(state, { payload }: PayloadAction<string>) {
      return { ...state, lang: payload };
    },
    saveHistory(state, { payload }: PayloadAction<any>) {
      return { ...state, history: { ...state.history, history: [...state.history.history, payload] } };
    },
    setErrorCity(state) {
      return { ...state, ...initialState, error: LOCALES[state.lang].notFound };
    },
    clearError(state) {
      return { ...state, error: null };
    },
    finishFetching(state) {
      return { ...state, fetching: false };
    },
  },
});

export const {
  init,
  startFetching,
  finishFetching,
  setCity,
  setErrorCity,
  clearError,
  setLang,
  saveHistory,
} = weatherSlice.actions;

export const getFetching = (state: RootState) => state.weather.fetching;
export const getCity = (state: RootState) => state.weather.city;
export const getLang = (state: RootState) => state.weather.lang;
export const getDays = (state: RootState) => state.weather.days;
export const getHistory = (state: RootState) => state.weather.history.history;
export const getError = (state: RootState) => state.weather.error;

export default weatherSlice.reducer;
