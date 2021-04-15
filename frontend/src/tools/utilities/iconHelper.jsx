import React from 'react';
import { ReactComponent as QuoteIcon } from '../../img/svg/quote-icon.svg';
import { ReactComponent as PROJECT_NAMEIcon } from '../../img/svg/PROJECT_NAME-logo-navbar.svg';
import { ReactComponent as MagnifyingPaperIcon } from '../../img/svg/magnifying-paper-icon.svg';
import { ReactComponent as CalculatorPaperIcon } from '../../img/svg/calculator-paper-icon.svg';

export const loadingIconHelper = {
    default: <PROJECT_NAMEIcon />,
    PROJECT_NAME: <PROJECT_NAMEIcon />,
    quote: (
        <QuoteIcon className="text-green-bright stroke-current fill-current w-28 h-28" />
    ),
};

export const taskIconHelper = {
    initialquote: (
        <QuoteIcon className="text-green-bright stroke-current fill-current w-28 h-28" />
    ),
    markactivity: (
        <MagnifyingPaperIcon className="text-green-bright stroke-current fill-current w-28 h-28" />
    ),
    connectaccountingsoftware: (
        <CalculatorPaperIcon className="text-green-bright stroke-current fill-current w-28 h-28" />
    ),
};
