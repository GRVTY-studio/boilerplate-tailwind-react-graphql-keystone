/* eslint-disable no-unused-vars */
import * as yup from 'yup';
import { emailRegex, websiteRegex, yearRegex } from './regex';
import { validationMessages } from './transforms';

const requiredEmail = yup
    .string()
    .required(validationMessages.required)
    .matches(emailRegex, 'Invalid email');
const requiredString = yup.string().required(validationMessages.required);
const requiredWebsite = yup
    .string()
    .required(validationMessages.required)
    .matches(websiteRegex, 'Invalid website');
const nonRequiredString = yup.string();
const requiredNumeric = yup
    .number()
    .typeError('Incorrect type')
    .required(validationMessages.required);
const requiredYear = yup
    .string()
    .required(validationMessages.required)
    .matches(yearRegex, 'Invalid year');
const uniqueString = (list = []) =>
    yup.string().validate((value) => !list.includes(value));

const password = yup.string().required(validationMessages.required).min(8);

export const signUpSchema = yup.object().shape({
    email: requiredEmail,
    firstName: requiredString,
    lastName: requiredString,
    password,
});

export const loginSchema = yup.object().shape({
    email: requiredEmail,
    password: requiredString,
});

export const updateUserAccountSchema = yup.object().shape({
    email: requiredEmail,
    firstName: requiredString,
    lastName: requiredString,
    password: requiredString,
});

export const newCompanySchema = yup.object().shape({
    legalName: requiredString,
    dba: nonRequiredString,
    industry: requiredString,
    website: requiredWebsite,
    yearOfIncorporation: requiredYear,
    businessType: requiredString,
});

export const updateCompanySchema = yup.object().shape({
    website: requiredWebsite,
    yearOfIncorporation: requiredYear,
});

export const addProjectSchema = (list) =>
    yup.object().shape({
        project: uniqueString(list),
    });
