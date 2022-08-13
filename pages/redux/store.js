import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk'; // untuk menghandle permintaan secara asynchronous

import reducer from './reducers';

export const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});
