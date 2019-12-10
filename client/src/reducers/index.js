import {combineReducers} from 'redux';
import authReducer from './authReducer';
// can be named just reducer but to skip confusion 
import { reducer as formReducer } from 'redux-form';
import streamReducer from './streamReducer';
export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
})