import { combineReducers, createStore, applyMiddleware } from "redux";
import applicationdata from "./reducers/applicationdata";
import selecteddevice from "./reducers/selecteddevice"
import statustype from "./reducers/statustype";
import { logger } from 'redux-logger'
const reducer = combineReducers({

    applicationdata: applicationdata,
    statustype: statustype,
    selecteddevice:selecteddevice,


});



const middleware = [ logger];


const store = createStore(reducer, {}, applyMiddleware(...middleware) );



export default store;
