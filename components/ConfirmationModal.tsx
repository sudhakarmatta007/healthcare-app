import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message,
    confirmButtonText = 'Confirm',
    cancelButtonText = 'Go Back'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" aria-modal="true" role="dialog">
            <div className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden p-6 text-center">
                <div className="mx-auto bg-red-100 dark:bg-red-900/30 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary mb-6">{message}</p>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-medium text-text-primary bg-background rounded-lg border border-card-border hover:bg-gray-100 dark:hover:bg-charcoal-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        {cancelButtonText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        {confirmButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};
