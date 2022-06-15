import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice'
import followReducer from '../features/follow/followSlice'
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { cryptoExchangesApi} from "../services/cryptoExchangesApi"

export const store = configureStore({
  reducer: {
    follow: followReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
  },

})
