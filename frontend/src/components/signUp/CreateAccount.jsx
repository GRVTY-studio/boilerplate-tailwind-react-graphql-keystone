import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button, { GoogleButton } from '../common/Button';
import Input from '../common/Input';
import PasswordInput from '../common/PasswordInput';
import { signUpSchema } from '../../tools/utilities/yupSchemas';
import { signUpThunk } from '../../tools/redux/thunks/authThunks';

const CreateAccount = () => {
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        errors: {
            firstName: { message: firstNameError } = {},
            lastName: { message: lastNameError } = {},
            email: { message: emailError } = {},
            password: { message: passwordError } = {},
        },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(signUpSchema),
    });

    const signUp = async (data) => {
        dispatch(signUpThunk(data));
    };

    return (
        <div className="mt-28 w-full px-10 xl:w-1/2 grid gap-5 inter font-normal text-blue-gray text-sm text-center">
            <a href={`${process.env.REACT_APP_GOOGLE_AUTH}`}>
                <GoogleButton content="Sign up" />
            </a>
            <div className="flex flex-row items-center justify-center">
                <div className="divider-gray-light w-1/3" />
                <div className="mx-5 text-blue-gray font-medium text-xs flex-shrink-0">
                    OR SIGN UP WITH YOUR EMAIL
                </div>
                <div className="divider-gray-light w-1/3" />
            </div>
            <form className="grid gap-5" onSubmit={handleSubmit(signUp)}>
                <div className="grid grid-flow-row xl:grid-flow-col gap-5">
                    <Input
                        label="First name"
                        placeholder="e.g. Thomas"
                        error={firstNameError}
                        name="firstName"
                        register={register}
                    />
                    <Input
                        label="Last name"
                        placeholder="e.g. Fielding"
                        error={lastNameError}
                        name="lastName"
                        register={register}
                    />
                </div>
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
                />
                <div className="flex flex-col-reverse xl:flex-row w-full items-center justify-between">
                    <div>
                        <span>Already have an account?</span>{' '}
                        <span>
                            <NavLink to="/login" className="link-green">
                                Log In
                            </NavLink>
                        </span>
                    </div>
                    <div className="w-full xl:w-1/2 my-2">
                        <Button
                            content="Create account"
                            primary
                            arrow
                            submit
                            fluid
                        />
                    </div>
                </div>
            </form>
            <div className="text-center h-10 items-center justify-center">
                <div>By clicking “Create Account” I agree to PROJECT_NAME’s</div>
                <div>
                    <NavLink className="link-green" to="/termsofservice">
                        Terms of Service
                    </NavLink>{' '}
                    &{' '}
                    <NavLink className="link-green" to="/privacypolicy">
                        Privacy Policy
                    </NavLink>{' '}
                </div>
            </div>
        </div>
    );
};

CreateAccount.propTypes = {};

CreateAccount.defaultProps = {};

export default withRouter(CreateAccount);
