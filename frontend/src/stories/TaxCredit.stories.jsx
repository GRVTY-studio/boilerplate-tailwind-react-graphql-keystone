import React from 'react';
import Modal from '../components/common/Modal';
import EstimatedTaxCredit from '../components/tasks/EstimatedTaxCredit';

export default {
    title: 'EstimatedTaxCredit',
    component: EstimatedTaxCredit,
};

const MainTemplate = (args) => (
    <Modal>
        <EstimatedTaxCredit {...args} />
    </Modal>
);

export const Main = MainTemplate.bind({});
Main.args = {
    wages: 0,
    supplies: 0,
    companyAge: 1,
    research: false,
};
