import React from 'react';
import Dropdown from '../components/common/Dropdown';
import Input from '../components/common/Input';

export default {
    title: 'Form',
};

const Template = () => (
    <div className="grid grid-cols-2 gap-5">
        <Input label="First name" placeholder="Johnathan" />
        <Input label="Last name" placeholder="Wick" />
        <Input label="Company Name" placeholder="eg: Google" />
        <Dropdown
            label="Occupation"
            options={[
                { value: 0, label: 'Information & Technology' },
                { value: 1, label: 'Genetic Alterations' },
                { value: 2, label: 'Dinosaur Smuggling' },
                { value: 3, label: 'Plumbing' },
            ]}
            selected={{ value: 3, label: 'Plumbing' }}
        />
    </div>
);

export const Form = Template.bind();
