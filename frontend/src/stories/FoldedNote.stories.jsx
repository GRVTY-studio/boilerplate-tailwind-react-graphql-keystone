import React from 'react';
import FoldedNote from '../components/common/FoldedNote';

export default {
    title: 'FoldedNotes',
    component: FoldedNote,
};

const MainTemplate = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-80 h-80 flex items-center justify-center">
            <FoldedNote>
                <div className="w-full h-full flex flex-col items-start justify-center">
                    <h2>A title</h2>
                    <p>Some content</p>
                </div>
            </FoldedNote>
        </div>
    </div>
);

export const Main = MainTemplate.bind({});
