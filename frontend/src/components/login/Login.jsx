/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button, { GoogleButton } from '../common/Button';
import Input from '../common/Input';
import PasswordInput from '../common/PasswordInput';
import { loginSchema } from '../../tools/utilities/yupSchemas';
import { loginThunk } from '../../tools/redux/thunks/authThunks';

const Login = ({ logIn }) => {
    const {
        handleSubmit,
        register,
        errors: {
            email: { message: emailError } = {},
            password: { message: passwordError } = {},
        },
        getValues,
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(loginSchema),
    });

    const { email, password } = getValues(['email', 'password']);
    const dispatch = useDispatch();
    const signIn = (data) => {
        dispatch(loginThunk(data));
    };

    return (
        <div className="w-2/5 grid gap-5 inter font-normal text-blue-gray text-sm text-center">
            <a href={`${process.env.REACT_APP_GOOGLE_AUTH}`}>
                <GoogleButton content="Log In" />
            </a>
            <div className="flex flex-row items-center justify-center">
                <div className="divider-gray-light w-1/3" />
                <div className="mx-5 text-blue-gray font-medium text-xs flex-shrink-0">
                    OR LOG IN WITH YOUR EMAIL
                </div>
                <div className="divider-gray-light w-1/3" />
            </div>
            <form className="grid gap-5" onSubmit={handleSubmit(signIn)}>
                <Input
                    label="Email"
                    placeholder="e.g. tom@mail.com"
                    error={emailError}
                    name="email"
                    register={register}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Choose a password"
                    error={passwordError}
                    name="password"
                    register={register}
                    allowShowPassword={false}
                />
                <div className="flex flex-col xl:flex-col xl:justify-between items-center w-full">
                    <div className="w-full flex flex-row items-center justify-between mb-8">
                        <NavLink to="/forgotpassword">Forgot password?</NavLink>
                        <Button
                            content="Log In"
                            primary
                            arrow
                            submit
                            disabled={
                                !email ||
                                !password ||
                                emailError ||
                                passwordError
                            }
                        />
                    </div>
                    <div>
                        <span>Don&apos;t have an account?</span>{' '}
                        <span>
                            <NavLink to="/signup" className="link-green">
                                Sign Up
                            </NavLink>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

Login.propTypes = {
    logIn: PropTypes.func.isRequired,
};

Login.defaultProps = {};

export default withRouter(Login);
