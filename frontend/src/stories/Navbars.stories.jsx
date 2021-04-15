import React from 'react';
import Navbar from '../components/nav/Navbar';
import SavingsNavMessage from '../components/nav/SavingsNavMessage';
import { navItems } from '../tools/utilities/transforms';

export default {
    title: 'Navbar',
    component: Navbar,
    argTypes: {
        additionalMessage: {
            table: {
                disable: true,
            },
        },
        current: {
            control: {
                type: 'select',
                options: Object.values(navItems),
            },
        },
    },
};

const Template = (args) => (
    <Navbar {...args} current={args.current || navItems.tasks} />
);

const Template2 = (args) => (
    <Navbar
        {...args}
        additionalMessage={
            <SavingsNavMessage
                amount={args.savingsAmount}
                current={args.current}
            />
        }
    />
);

export const Primary = Template.bind({});
Primary.args = {};

export const WithMessage = Template2.bind({});
WithMessage.args = {
    savingsAmount: 59695,
};
