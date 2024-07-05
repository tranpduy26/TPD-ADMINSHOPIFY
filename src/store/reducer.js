import React from 'react'
import { combineReducers } from 'redux';
import authReducer from "./auth/authSlice";
import listProductsReducer from './products/list';
import productReducer from './products'

// compine user
 const rootReducer = combineReducers({
        auth:authReducer,
        products:productReducer
})
export default rootReducer

