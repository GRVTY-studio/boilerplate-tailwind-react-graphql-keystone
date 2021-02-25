import React from 'react';
import Button from '../components/common/Button';

export default {
    title: 'Button',
    component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    content: 'Button',
    primary: true,
    disabled: false,
};
