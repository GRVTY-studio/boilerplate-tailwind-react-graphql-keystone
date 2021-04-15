import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Input from '../common/Input';
import PasswordInput from '../common/PasswordInput';
import { validationMessages } from '../../tools/utilities/transforms';
import { updateUserThunk } from '../../tools/redux/thunks/authThunks';
import { emailRegex } from '../../tools/utilities/regex';

const ProfileAccountDetails = ({ user }) => {
    const dispatch = useDispatch();
    const { handleSubmit, register, errors, watch } = useForm({
        mode: 'onChange',
    });

    const password = watch('password');
    const { required } = validationMessages;

    const update = (data) => {
        dispatch(updateUserThunk(data));
    };

    return (
        <form
            className="grid grid-flow-col w-full gap-5 grid-cols-2"
            onSubmit={handleSubmit(update)}
            id="update-user-account"
        >
            <div className="grid grid-flow-row gap-5">
                <h2 className="">ACCOUNT</h2>
                <div className="grid grid-flow-col gap-5">
                    <Input
                        name="firstName"
                        error={errors?.firstName?.message}
                        register={register({
                            required,
                        })}
                        label="First name"
                        defaultValue={user?.firstName}
                    />
                    <Input
                        name="lastName"
                        error={errors?.lastName?.message}
                        register={register({
                            required,
                        })}
                        label="Last name"
                        defaultValue={user?.lastName}
                    />
                </div>
                <Input
                    name="email"
                    error={errors?.email?.message}
                    register={register({
                        pattern: {
                            value: emailRegex,
                            message: 'Invalid email',
                        },
                        required,
                    })}
                    label="Email"
                    defaultValue={user?.email}
                />
            </div>
            <div className="grid grid-flow-row gap-5">
                <h2>CHANGE PASSWORD</h2>
                <PasswordInput
                    register={register({
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
            </div>
        </form>
    );
};

ProfileAccountDetails.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
    }).isRequired,
};

ProfileAccountDetails.defaultProps = {};

export default ProfileAccountDetails;
