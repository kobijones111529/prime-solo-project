import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import logger from "redux-logger";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import { useDispatch, useSelector } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger]
});

sagaMiddleware.run(rootSaga);

export default store;

/** @typedef {typeof store.dispatch} AppDispatch */
/** @typedef {ReturnType<typeof store.getState>} RootState */
