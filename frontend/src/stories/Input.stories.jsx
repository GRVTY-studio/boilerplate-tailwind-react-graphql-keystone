import React, { useState } from 'react';
import Input from '../components/common/Input';
import { ReactComponent as ShowPasswordIcon } from '../img/svg/password-show-icon.svg';
import { ReactComponent as HidePasswordIcon } from '../img/svg/password-hide-icon.svg';

export default {
    title: 'Input',
    component: Input,
    argTypes: {
        register: {
            table: {
                disable: true,
            },
        },
        icon: {
            table: {
                disable: true,
            },
        },
        onChange: {
            table: {
                disable: true,
            },
        },
        id: {
            table: {
                disable: true,
            },
        },
        name: {
            table: {
                disable: true,
            },
        },
        type: {
            table: {
                disable: true,
            },
        },
    },
};

const baseProps = {
    placeholder: 'eg: Sarah',
    label: 'First name',
    id: 'firstName',
};

const Template = (args) => <Input {...args} />;
const PasswordField = (args) => {
    const [passwordToggle, setPasswordToggle] = useState(true);
    return (
        <Input
            {...args}
            icon={passwordToggle ? ShowPasswordIcon : HidePasswordIcon}
            type={passwordToggle ? 'password' : 'text'}
            onIconClick={() => setPasswordToggle(!passwordToggle)}
        />
    );
};

export const BasicInput = Template.bind({});
BasicInput.args = { ...baseProps };

export const PasswordInput = PasswordField.bind({});
PasswordInput.args = {
    placeholder: 'password',
    label: 'Password',
    id: 'password',
    type: 'password',
};
