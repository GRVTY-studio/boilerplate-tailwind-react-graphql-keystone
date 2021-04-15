import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import queryString from 'querystring';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { resetPasswordThunk } from '../../tools/redux/thunks/authThunks';
import PasswordInput from '../common/PasswordInput';
import { validationMessages } from '../../tools/utilities/transforms';
import Button from '../common/Button';

const PasswordReset = ({ location }) => {
    const dispatch = useDispatch();
    const { search } = location || {};
    const { '?token': token } = queryString.parse(search);

    const resetPassword = ({ password }) => {
        dispatch(resetPasswordThunk({ token, password }));
    };
    const { handleSubmit, register, errors, watch } = useForm({
        mode: 'onChange',
    });
    const password = watch('password');
    const { required } = validationMessages;

    return (
        <div className="w-2/5 grid gap-5 inter font-normal text-blue-gray text-sm text-center">
            <form
                className="grid gap-5 grid-flow-row place-items-center"
                onSubmit={handleSubmit(resetPassword)}
            >
                <PasswordInput
                    register={register({
                        required,
                        minLength: {
                            value: 8,
                            message: 'Minimum 8 characters',
                        },
                    })}
                    label="New password"
                    name="password"
                    error={errors?.password?.message}
                    allowShowPassword
                    autoComplete="new-password"
                />
                <PasswordInput
                    register={register({
                        required,
                        minLength: {
                            value: 8,
                            message: 'Minimum 8 characters',
                        },
                        validate: (value) =>
                            value === password || 'Passwords do not match',
                    })}
                    label="Confirm new password"
                    name="confirmPassword"
                    error={errors?.confirmPassword?.message}
                    allowShowPassword
                    autoComplete="new-password"
                />
                <div className="flex flex-row items-center w-full justify-between">
                    <NavLink to="/login" className="link-green">
                        Back to login
                    </NavLink>
                    <Button submit primary content="Submit" />
                </div>
            </form>
        </div>
    );
};

PasswordReset.propTypes = {
    location: PropTypes.string.isRequired,
};

PasswordReset.defaultProps = {};

export default withRouter(PasswordReset);
