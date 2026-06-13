import {configureStore} from "@reduxjs/toolkit";
import weatherApiReducer from "./weatherApiSlice";
export default configureStore({
    reducer:{
        weather:weatherApiReducer
    }
});