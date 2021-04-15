import React from 'react';

const SomethingWentWrong = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-1/2 h-1/2 flex flex-col items-center justify-center">
            <h1>Something went wrong</h1>
            <h2>Please contact support</h2>
        </div>
    </div>
);

SomethingWentWrong.propTypes = {};

SomethingWentWrong.defaultProps = {};

export default SomethingWentWrong;
