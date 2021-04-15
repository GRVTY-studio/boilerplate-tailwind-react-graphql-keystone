import React from 'react';
import { toast } from 'react-toastify';
import ToastContent from '../../components/common/ToastContent';

export const getToastMessageComponent = ({ message, toastProps }) => (
    <ToastContent message={message} toastProps={toastProps} />
);

export const showToastError = (message) =>
    toast.error((toastProps) =>
        getToastMessageComponent({
            message,
            toastProps,
        }),
    );

export const showToastSuccess = (message) =>
    toast.success((toastProps) =>
        getToastMessageComponent({
            message,
            toastProps,
        }),
    );
