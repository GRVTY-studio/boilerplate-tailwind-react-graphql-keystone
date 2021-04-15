/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from 'redux';
import errorReducer from './slices/errorSlice';
import authReducer from './slices/authSlice';
import quoteReducer from './slices/quoteSlice';
import companyReducer from './slices/companySlice';
import integrationReducer from './slices/integrationSlice';
import industriesReducer from './slices/industrySlice';
import employeesReducer from './slices/employeeSlice';
import departmentsReducer from './slices/departmentSlice';
import yearlyIncomeReducer from './slices/yearlyIncomeSlice';
import taskConfirmationReducer from './slices/taskConfirmationSlice';

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    quotes: quoteReducer,
    company: companyReducer,
    integrations: integrationReducer,
    industries: industriesReducer,
    employees: employeesReducer,
    departments: departmentsReducer,
    yearlyIncome: yearlyIncomeReducer,
    taskConfirmation: taskConfirmationReducer,
});
