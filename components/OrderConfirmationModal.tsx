import React from 'react';
import type { Order } from '../types';

interface OrderConfirmationModalProps {
    order: Order;
    onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden p-8 text-center">
                <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-text-primary">Order Placed Successfully!</h2>
                <p className="text-sm text-text-secondary mt-2 mb-6">
                    Your order ID is <span className="font-semibold text-text-primary">{order.id}</span>. Thank you for your purchase!
                </p>
                
                <div className="bg-background border border-card-border rounded-xl p-5 text-left space-y-4">
                    <h3 className="text-md font-bold text-text-primary text-center border-b border-card-border pb-3 mb-3">Order Summary</h3>
                    <div>
                        <p className="text-xs font-semibold text-text-secondary uppercase">Delivery To</p>
                        <p className="text-sm font-medium text-text-primary">{order.name}</p>
                        <p className="text-sm text-text-secondary">{order.address}</p>
                        <p className="text-sm text-text-secondary">{order.contact}</p>
                    </div>
                     <div>
                        <p className="text-xs font-semibold text-text-secondary uppercase">Total Amount</p>
                        <p className="text-lg font-bold text-gold-500">₹{order.total.toFixed(2)}</p>
                        <p className="text-sm text-text-secondary">Paid via {order.paymentMethod}</p>
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="mt-8 w-full bg-gold-400 text-accent-text font-bold py-3 px-4 rounded-lg hover:bg-gold-500 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};