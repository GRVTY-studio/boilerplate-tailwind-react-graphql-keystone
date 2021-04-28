import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';
import { validationMessages } from '../../tools/utilities/transforms';
import { emailRegex } from '../../tools/utilities/regex';
import Modal from '../common/Modal';
import { requestPasswordResetThunk } from '../../tools/redux/thunks/authThunks';

const RequestPasswordReset = () => {
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);
    const {
        handleSubmit,
        register,
        errors: { email: { message: emailError } = {} },
    } = useForm({
        mode: 'onChange',
    });

    const { required } = validationMessages;

    const request = (data) => dispatch(requestPasswordResetThunk(data));
    if (success)
        return (
            <Modal>
                <div className="modal-container">
                    <h2 className="my-10">Reset link sent to your email</h2>

                    <Button
                        secondary
                        content="Close"
                        onClick={() => setSuccess(false)}
                    />
                </div>
            </Modal>
        );

    return (
        <div className="w-2/5 grid gap-5 inter font-normal text-blue-gray text-sm text-center">
            <form className="grid gap-5" onSubmit={handleSubmit(request)}>
                <Input
                    label="Email"
                    placeholder="e.g. tom@mail.com"
                    error={emailError}
                    name="email"
                    register={register({
                        required,
                        validate: (value) =>
                            emailRegex.test(String(value).toLowerCase()) ||
                            'Invalid email',
                    })}
                />

                <div className="flex flex-col xl:flex-col xl:justify-between items-center w-full">
                    <div className="w-full flex flex-row items-center justify-center mb-8">
                        <Button
                            content="Request password reset"
                            primary
                            arrow
                            submit
                            fluid
                        />
                    </div>
                    <div>
                        <span>
                            <NavLink to="/login" className="link-green">
                                Back to login
                            </NavLink>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    );
};

RequestPasswordReset.propTypes = {};

RequestPasswordReset.defaultProps = {};

export default withRouter(RequestPasswordReset);
