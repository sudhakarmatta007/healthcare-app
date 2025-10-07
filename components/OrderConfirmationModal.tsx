
import React from 'react';
import type { Order } from '../types';

interface OrderConfirmationModalProps {
    order: Order;
    onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden p-8 text-center">
                <div className="mx-auto bg-green-100 dark:bg-green-900/50 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Order Placed Successfully!</h2>
                <p className="text-sm text-muted-foreground mt-2 mb-6">
                    Your order ID is <span className="font-semibold text-foreground">{order.id}</span>. Thank you for your purchase!
                </p>
                
                <div className="bg-secondary border border-border rounded-xl p-5 text-left space-y-4">
                    <h3 className="text-md font-bold text-foreground text-center border-b border-border pb-3 mb-3">Order Summary</h3>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Delivery To</p>
                        <p className="text-sm font-medium text-foreground">{order.name}</p>
                        <p className="text-sm text-muted-foreground">{order.address}</p>
                        <p className="text-sm text-muted-foreground">{order.contact}</p>
                    </div>
                     <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Total Amount</p>
                        <p className="text-lg font-bold text-accent">₹{order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Paid via {order.paymentMethod}</p>
                    </div>
                </div>

                <button 
                    onClick={onClose}
                    className="mt-8 w-full bg-accent text-accent-foreground font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};
