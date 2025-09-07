import { useEffect } from 'react';
import { Icons } from '../Icons';
import { CONFIG } from '../../config';

const ErrorToast = ({ message, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, CONFIG.AUTO_DISMISS_TIMEOUT);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div className="fixed bottom-5 right-5 bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center z-50 toast-enter-active">
            <Icons.XCircle size={24} className="mr-3" />
            <span>{message}</span>
        </div>
    );
};

export default ErrorToast;
