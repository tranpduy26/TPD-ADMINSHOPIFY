
import { configureStore, applyMiddleware,getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from "./reducer";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
  
  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist:['auth']

  }
   const persistedReducer = persistReducer(persistConfig, rootReducer)
 export const store = configureStore({
    reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  })

export let persistor = persistStore(store)