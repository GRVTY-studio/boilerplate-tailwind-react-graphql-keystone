import React from 'react';
import ListItem from '../components/common/TaskListItem';
import { ReactComponent as QuoteIcon } from '../img/svg/quote-icon.svg';

export default {
    title: 'List Items',
    component: ListItem,
    argTypes: { onClick: { table: { disable: true } } },
};

const MainTemplate = ({ isNew, complete, canEdit }) => (
    <div className="grid grid-flow-row gap-10 w-full">
        <ListItem
            title="Get initial quote"
            isNew={isNew}
            buttonContent="Add info"
            complete={complete}
            canEdit={canEdit}
            mainIcon={QuoteIcon}
        />
    </div>
);
export const Main = MainTemplate.bind({});
