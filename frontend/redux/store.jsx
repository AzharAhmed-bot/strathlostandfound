import {configureStore} from "@reduxjs/toolkit";
import lostAndFoundReducer from "./lostandfoundSlicer";


 const store=configureStore({
    reducer:{
        lostAndFound:lostAndFoundReducer,
    }
})

export default store;