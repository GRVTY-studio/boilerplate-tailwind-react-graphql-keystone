import React from 'react';

import { ReactComponent as MagnifyingPaperIcon } from '../../img/svg/magnifying-paper-icon.svg';
import { ReactComponent as CalculatorPaperIcon } from '../../img/svg/calculator-paper-icon.svg';

export const loadingIconHelper = {
    default: <MagnifyingPaperIcon />,
    PROJECT_NAME: <MagnifyingPaperIcon />,
    quote: (
        <MagnifyingPaperIcon className="text-green-bright stroke-current fill-current w-28 h-28" />
    ),
};

export const taskIconHelper = {
    initialquote: (
        <MagnifyingPaperIcon className="text-green-bright stroke-current fill-current w-28 h-28" />
    ),
    markactivity: (
        <MagnifyingPaperIcon className="text-green-bright stroke-current fill-current w-28 h-28" />
    ),
    connectaccountingsoftware: (
        <CalculatorPaperIcon className="text-green-bright stroke-current fill-current w-28 h-28" />
    ),
};
