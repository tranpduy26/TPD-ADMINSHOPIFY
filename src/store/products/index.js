import React from 'react'
import { combineReducers } from 'redux';
import  detailProductReducer  from './detail';
import listProductReducer from "./list";

// compine user
 const productReducer = combineReducers({
        listProduct:listProductReducer,
        detailProduct:detailProductReducer
})
export default productReducer

