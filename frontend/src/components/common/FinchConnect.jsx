import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useFinchConnect } from 'react-finch-connect';
import Button from './Button';
import {
    addIntegrationThunk,
    updateIntegrationThunk,
} from '../../tools/redux/thunks/integrationThunks';

const FinchConnect = ({
    setError,
    isNew,
    integrationId,
    content,
    finchAccountId,
}) => {
    const dispatch = useDispatch();

    const onSuccess = ({ code }) => {
        if (isNew) {
            return dispatch(addIntegrationThunk({ code, provider: 'finch' }));
        }

        return dispatch(
            updateIntegrationThunk({
                code,
                provider: 'finch',
                integrationId,
                finchAccountId,
            }),
        );
    };
    const onError = ({ errorMessage }) => setError(errorMessage);
    // const onClose = () => console.log('User exited Finch Connect');

    const { open } = useFinchConnect({
        clientId: process.env.REACT_APP_FINCH_CLIENT_ID,
        // payrollProvider: '<payroll-provider-id>',
        products: [
            'company',
            'directory',
            'employment',
            'payment',
            'pay_statement',
        ],
        onSuccess,
        onError,
        // onClose,
    });

    const onClick = () => {
        toast.info('Loading providers', { autoClose: 2000 });
        open();
    };

    return <Button primary full content={content} onClick={onClick} />;
};

FinchConnect.propTypes = {
    setError: PropTypes.func.isRequired,
    isNew: PropTypes.bool.isRequired,
    integrationId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    finchAccountId: PropTypes.string.isRequired,
};

FinchConnect.defaultProps = {};

export default FinchConnect;
