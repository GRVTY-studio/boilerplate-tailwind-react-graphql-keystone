import React from 'react';
import Toast from '../components/common/Toast';

export default {
    title: 'Toasts',
    component: Toast,
};

const MainTemplate = (args) => <Toast {...args} />;

export const Main = MainTemplate.bind({});
Main.args = {
    content: 'Success',
    success: true,
    error: false,
};
