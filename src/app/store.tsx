import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: process.env.NODE_ENV !== "production",
      serializableCheck: process.env.NODE_ENV !== "production",
      thunk: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch

export default store;
