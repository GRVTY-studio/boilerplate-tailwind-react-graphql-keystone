import React from 'react';
import Button, { GoogleButton } from '../components/common/Button';

export default {
    title: 'Buttons',
    component: Button,
    argTypes: {
        submit: {
            table: {
                disable: true,
            },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
    },
};

const MainTemplate = (args) => <Button {...args} />;

export const Main = MainTemplate.bind({});
Main.args = {
    content: 'Button',
    primary: true,
    secondary: false,
    disabled: false,
    arrow: true,
    small: false,
};

const GoogleTemplate = ({ content }) => (
    <div className="grid gap-5 w-full h-full p-5">
        <GoogleButton />
        <div className="w-full grid grid-flow-col gap-5">
            <GoogleButton content={content} />
            <GoogleButton content={content} />
        </div>
    </div>
);
export const Google = GoogleTemplate.bind({});
Google.args = {
    content: 'Sign Up',
};
