import React from 'react';
import Modal, { WelcomeModal } from '../components/common/Modal';
import EstimatedTaxCredit from '../components/tasks/EstimatedTaxCredit';

export default {
    title: 'Modals',
    component: Modal,
};

const MainTemplate = (args) => (
    <Modal {...args}>
        <EstimatedTaxCredit
            wages={4000}
            supplies={50000}
            research={50000}
            savings={[50000, 700000]}
        />
    </Modal>
);

export const Main = MainTemplate.bind({});
Main.args = {};

const WelcomeTemplate = () => <WelcomeModal name="Sarah" year="2020" />;
export const Welcome = WelcomeTemplate.bind({});
