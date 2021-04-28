/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from 'redux';
import errorReducer from './slices/errorSlice';
import authReducer from './slices/authSlice';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
});
