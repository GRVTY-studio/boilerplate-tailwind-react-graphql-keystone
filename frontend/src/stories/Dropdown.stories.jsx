import React from 'react';
import Dropdown from '../components/common/Dropdown';

export default {
    title: 'Dropdown',
    component: Dropdown,
    argTypes: {
        onChange: {
            table: {
                disable: true,
            },
        },
    },
};

const Template = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Industry',
    selected: { value: 2, label: 'Dinosaur Smuggling' },
    options: [
        { value: 0, label: 'Information & Technology' },
        { value: 1, label: 'Genetic Alterations' },
        { value: 2, label: 'Dinosaur Smuggling' },
    ],
};
